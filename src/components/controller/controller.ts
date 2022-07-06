import AppLoader from './appLoader';
import { ICallback, IData } from '../../helpers/interfaces';
import { Endpoints } from '../../helpers/enums';
import { checkForNull } from '../../helpers/functions';

class AppController extends AppLoader {
    public getSources(callback: ICallback<IData>): void {
        super.getResp(
            {
                endpoint: Endpoints.sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: ICallback<IData>): void {
        let target: EventTarget = checkForNull(e.target);
        const newsContainer: EventTarget = checkForNull(e.currentTarget);

        while (target !== newsContainer) {
            if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {

                if (target.classList.contains('source__item')) {
                    Array.from(document.querySelectorAll('.source__item'))
                        .forEach((source: Element): void => source.classList.remove('selected'));
                    target.classList.add('selected');
                    const sourceId: string = checkForNull(target.getAttribute('data-source-id'));
    
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
                target = checkForNull(target.parentNode);
            }
        }
    }
}

export default AppController;
