import News from './news/news';
import Sources from './sources/sources';
import { Data, Article } from '../../helpers/interfaces';
import { Subsource } from '../../helpers/types';

export class AppView {
    private news: News;
    private sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: Data): void {
        const values: Array<Article> = data?.articles 
            ? data?.articles 
            : [];
        this.news.draw(values);
    }

    drawSources(data: Data): void {
        const values: Array<Subsource> = data?.sources 
            ? data?.sources 
            : [];
        this.sources.draw(values);
    }
}

export default AppView;
