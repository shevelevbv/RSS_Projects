export interface Callback {
  (param?: Data) : void;
}

export interface Source {
  id: string | null;
  name: string;
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
