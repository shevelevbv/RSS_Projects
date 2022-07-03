import AppLoader from './appLoader';
import { Callback, Data } from '../../helpers/interfaces';
import { Endpoints, Errors } from '../../helpers/enums';

class AppController extends AppLoader {
    getSources(callback: Callback<Data>): void {
        super.getResp(
            {
                endpoint: Endpoints.sources,
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: Callback<Data>): void {
        let target: EventTarget | null = e.target;
        const newsContainer: EventTarget | null = e.currentTarget;

        while (target !== newsContainer) {
            if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
                if (!(target && newsContainer)) {
                    throw new Error(Errors.isNull);
                }
                if (target.classList.contains('source__item')) {
                    const sources: Array<HTMLTemplateElement> = Array.from(document.querySelectorAll('.source__item'));
                    sources.forEach(source => source.classList.remove('selected'));
                    target.classList.add('selected');
                    const sourceId: string | null = target.getAttribute('data-source-id');
                    if (!sourceId) {
                        throw new Error(Errors.noSource);
                    }
                    if (newsContainer.getAttribute('data-source') !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: Endpoints.everything,
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                target = target.parentNode;
            }
            
        }
    }
}

export default AppController;
