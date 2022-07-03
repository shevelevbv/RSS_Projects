import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Data } from '../../helpers/interfaces'
import { checkForNull } from '../../helpers/functions'

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources: HTMLTemplateElement = checkForNull(document.querySelector('.sources'));
        const okButton: HTMLTemplateElement = checkForNull(document.querySelector('.menu__button'));
        sources.addEventListener('click', (e: MouseEvent) => this.controller.getNews(e, (data: Data | undefined) => this.view.drawNews(data as Data)));
        okButton.addEventListener('click', () => this.view.drawSources(this.controller.getData()));
        this.controller.getSources((data: Data | undefined) => this.view.drawSources(data as Data));
    }
}

export default App;
