import News from './news/news';
import Sources from './sources/sources';
import { IData, IArticle } from '../../helpers/interfaces';
import { Subsource } from '../../helpers/types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: IData): void {
        const values: Array<IArticle> = data?.articles 
            ? data?.articles 
            : [];
        this.news.draw(values);
    }

    public drawSources(data: IData): void {
        const values: Array<Subsource> = data?.sources 
            ? data?.sources 
            : [];
        this.sources.draw(values);
    }
}

export default AppView;