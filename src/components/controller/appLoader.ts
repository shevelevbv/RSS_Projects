import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '48c7410fecb344a7bf036b03f4aa47bc',
        });
    }
}

export default AppLoader;
