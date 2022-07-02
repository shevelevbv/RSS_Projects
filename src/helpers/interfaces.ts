export interface Callback<T> {
  (param: T) : void;
}

export interface Source {
  id: string | null;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export interface Article {
  source: Source,
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface Data {
  status: string;
  totalResults: number;
  articles: Array<Article>;
  sources: Array<Source>;
}

export interface Request {
  apiKey: string;
}

export interface Endpoint {
  endpoint: string;
  options?: Options; 
}

export interface Options {
  sources?: string;
}

