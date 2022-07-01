import News from './news/news';
import Sources from './sources/sources';
import { Response, Article, Source } from '../../types/index';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Response): void {
        const values: Array<Article> = data?.articles 
            ? data?.articles 
            : [];

        this.news.draw(values);
    }

    drawSources(data: Response): void {
        const values: Array<Source> = data?.sources 
            ? data?.sources 
            : [];
            
        this.sources.draw(values);
    }
}

export default AppView;
