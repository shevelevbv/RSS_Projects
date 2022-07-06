export interface ICallback<T> {
  (param: T) : void;
}

export interface ISource {
  id: string | null;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface IArticle {
  source: ISource,
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface IData {
  status: string;
  totalResults: number;
  articles: Array<IArticle>;
  sources: Array<ISource>;
}

export interface IRequest {
  apiKey: string;
}

export interface IEndpoint {
  endpoint: string;
  options?: IOptions; 
}

export interface IOptions {
  sources?: string;
}

