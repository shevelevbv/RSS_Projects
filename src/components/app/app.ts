import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Data } from '../../helpers/interfaces'
import { Errors } from '../../helpers/enums';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sources: HTMLTemplateElement | null = document.querySelector('.sources');
        if (!sources) {
            throw new Error(Errors.isNull);
        }
        sources.addEventListener('click', (e) => this.controller.getNews(e, (data: Data | undefined) => this.view.drawNews(data as Data)));
        this.controller.getSources((data: Data | undefined) => this.view.drawSources(data as Data));
    }
}

export default App;
