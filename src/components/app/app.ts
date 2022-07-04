import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Data } from '../../helpers/interfaces'
import { checkForNull } from '../../helpers/functions'

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        const sources: HTMLTemplateElement = checkForNull(document.querySelector('.sources'));
        const select: HTMLTemplateElement = checkForNull(document.querySelector('.menu__select'));
        sources.addEventListener('click', (e: MouseEvent): void => this.controller.getNews(e, (data: Data | null) => this.view.drawNews(checkForNull(data))));
        select.addEventListener('change', (): void => this.view.drawSources(this.controller.getData()));
        this.controller.getSources((data: Data | null): void => this.view.drawSources(checkForNull(data)));
    }
}

export default App;
