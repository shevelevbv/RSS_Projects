import './news.css';
import { Article } from '../../../helpers/interfaces';
import { Errors } from '../../../helpers/enums';
import { HtmlTempElementOrNull } from '../../../helpers/types';

class News {
    draw(data: Array<Article>): void {
        const news: Array<Article> = data.length >= 10 
            ? data.filter((_item: Article, idx: number) => idx < 10) 
            : data;
        const fragment: DocumentFragment = document.createDocumentFragment();

        const newsItemTemp: HtmlTempElementOrNull = document.querySelector('#newsItemTemp');
        if (!newsItemTemp) {
            throw new Error(Errors.isNull);
        }

        news.forEach((item: Article, idx: number) => {

            const newsClone: Node | null = newsItemTemp.content.cloneNode(true);
            if (!newsClone) {
                throw new Error(Errors.isNull);
            }

            if (newsClone instanceof DocumentFragment) {
                const newsItem: HtmlTempElementOrNull = newsClone.querySelector('.news__item');
                const newsMetaPhoto: HtmlTempElementOrNull = newsClone.querySelector('.news__meta-photo');
                const newsMetaAuthor: HtmlTempElementOrNull = newsClone.querySelector('.news__meta-author');
                const newsMetaDate: HtmlTempElementOrNull = newsClone.querySelector('.news__meta-date');
                const newsDescTitle: HtmlTempElementOrNull = newsClone.querySelector('.news__description-title');
                const newsDescSource: HtmlTempElementOrNull = newsClone.querySelector('.news__description-source');
                const newsDescContent: HtmlTempElementOrNull = newsClone.querySelector('.news__description-content');
                const newsReadMore: HtmlTempElementOrNull = newsClone.querySelector('.news__read-more a');
                if (!newsItem
                    || !newsMetaPhoto
                    || !newsMetaAuthor
                    || !newsMetaDate
                    || !newsDescTitle
                    || !newsDescSource
                    || !newsDescContent
                    || !newsReadMore) {
                    throw new Error(Errors.isNull);
                }
                if (idx % 2) newsItem.classList.add('alt');
                newsMetaPhoto.style.backgroundImage = `url(${
                    item.urlToImage || 'img/news_placeholder.jpg'
                })`;
                newsMetaAuthor.textContent = item.author || item.source.name;
                newsMetaDate.textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');
                newsDescTitle.textContent = item.title;
                newsDescSource.textContent = item.source.name;
                newsDescContent.textContent = item.description;
                newsReadMore.setAttribute('href', item.url);
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
