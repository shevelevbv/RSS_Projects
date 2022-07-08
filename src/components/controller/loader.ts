import { Endpoints } from '../../helpers/enums';
import { ICallback, IData, IEndpoint, IOptions, IRequest } from '../../helpers/interfaces';
import { ReqAndOpt } from '../../helpers/types';

class Loader {
    private baseLink: string;
    private options: IRequest;
    private sourceData: IData;

    constructor(baseLink: string, options: IRequest) {
        this.baseLink = baseLink;
        this.options = options;
        this.sourceData = {} as IData;
    }

    public getData(): IData {
        return this.sourceData;
    }

    public getResp(
        endpoint: IEndpoint,
        callback: ICallback<IData> = (): void => {
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

    private makeUrl(options: IOptions, endpoint: string): string {
        const urlOptions: ReqAndOpt = { ...this.options, ...options };
        let url: string = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string): void => {
            url += `${key}=${urlOptions[key as keyof ReqAndOpt]}&`;
        });

        return url.slice(0, -1);
    }

    private load(method: string, endpoint: string, callback: ICallback<IData>, options: IOptions = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response): Promise<IData> => res.json())
            .then((data: IData): void => {
                if (endpoint === Endpoints.sources) {
                    this.sourceData = data;
                }
                callback(data);
            })
            .catch((err: Error): void => console.error(err));
    }
}

export default Loader;
