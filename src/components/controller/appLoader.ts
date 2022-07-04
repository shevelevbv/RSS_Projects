import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '166408f42c074c98be7cd75f13f09326',
        });
    }
}

export default AppLoader;
