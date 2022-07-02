import { Callback, Data, Endpoint, Options, Request } from '../../helpers/interfaces';
import { ReqAndOpt } from '../../helpers/types';

class Loader {
    baseLink: string;
    options: Request;

    constructor(baseLink: string, options: Request) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        endpoint: Endpoint,
        callback: Callback<Data> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint.endpoint, callback, endpoint.options);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Options, endpoint: string): string {
        const urlOptions: ReqAndOpt = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key as keyof ReqAndOpt]}&`;
        });

        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Callback<Data>, options: Options = {}): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: Data) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
