import { Endpoints } from '../../helpers/enums';
import { Callback, Data, Endpoint, Options, Request } from '../../helpers/interfaces';
import { ReqAndOpt } from '../../helpers/types';

class Loader {
    private baseLink: string;
    private options: Request;
    private sourceData: Data;

    constructor(baseLink: string, options: Request) {
        this.baseLink = baseLink;
        this.options = options;
        this.sourceData = {} as Data;
    }

    public getData(): Data {
        return this.sourceData;
    }

    public getResp(
        endpoint: Endpoint,
        callback: Callback<Data> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint.endpoint, callback, endpoint.options);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options, endpoint: string): string {
        const urlOptions: ReqAndOpt = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key as keyof ReqAndOpt]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: Callback<Data>, options: Options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<Data> => res.json())
            .then((data: Data): void => {
                if (endpoint === Endpoints.sources) {
                    this.sourceData = data;
                }
                callback(data);
            })
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
