import './news.css';
import { Article } from '../../../helpers/interfaces';
import { Errors } from '../../../helpers/enums';
import { checkForNull } from '../../../helpers/functions';

class News {
    draw(data: Array<Article>): void {
        const news: Array<Article> = data.length >= 10 
            ? data.filter((_item: Article, idx: number) => idx < 10) 
            : data;
        const fragment: DocumentFragment = document.createDocumentFragment();

        const newsItemTemp: HTMLTemplateElement = checkForNull(document.querySelector('#newsItemTemp'));

        news.forEach((item: Article, idx: number) => {

            const newsClone: Node | null = newsItemTemp.content.cloneNode(true);
            if (!newsClone) {
                throw new Error(Errors.isNull);
            }

            if (newsClone instanceof DocumentFragment) {
                
                if (idx % 2) checkForNull(newsClone.querySelector('.news__item')).classList.add('alt');
                checkForNull(newsClone.querySelector('.news__meta-photo')).style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
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

        const newsElement: Element | null = document.querySelector('.news');
        if (!newsElement) {
            throw new Error(Errors.isNull);
        }
        newsElement.innerHTML = '';
        newsElement.appendChild(fragment);
    }
}

export default News;
