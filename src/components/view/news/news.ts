import './news.css';
import { Article } from '../../../helpers/interfaces';
import { checkForNull } from '../../../helpers/functions';
import { PageSettings } from '../../../helpers/enums';

class News {
    draw(data: Array<Article>): void {
        const news: Array<Article> = data.length >= PageSettings.maxArticlesPerPage
            ? data.filter((_item: Article, idx: number) => idx < PageSettings.maxArticlesPerPage) 
            : data;
        const fragment: DocumentFragment = document.createDocumentFragment();

        const newsItemTemp: HTMLTemplateElement = checkForNull(document.querySelector('#newsItemTemp'));

        news.forEach((item: Article, idx: number) => {
            const newsClone: Node = checkForNull(newsItemTemp.content.cloneNode(true));

            if (newsClone instanceof DocumentFragment) {
                
                if (idx % 2) checkForNull(newsClone.querySelector('.news__item')).classList.add('alt');
                checkForNull(newsClone.querySelector('.news__meta-photo') as HTMLTemplateElement | null).style.backgroundImage = `url(${
                    item.urlToImage || '../../../../news_placeholder.png'
                })`;
                checkForNull(newsClone.querySelector('.news__meta-author')).textContent = item.author || item.source.name;
                checkForNull(newsClone.querySelector('.news__meta-date')).textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
                checkForNull(newsClone.querySelector('.news__description-title')).textContent = item.title;
                checkForNull(newsClone.querySelector('.news__description-source')).textContent = item.source.name;
                checkForNull(newsClone.querySelector('.news__description-content')).textContent = item.description;
                checkForNull(newsClone.querySelector('.news__read-more a')).setAttribute('href', item.url);
            }

            fragment.append(newsClone);
        });

        const newsElement: Element = checkForNull(document.querySelector('.news'));
        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
