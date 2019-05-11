import './assets/styles/app.scss';
import { Header } from './components/Header/Header';
import { Body } from './components/Body/Body';
import { Footer } from './components/Footer/Footer';
import { Utils } from './utils/Utils';

class App {

    private header: Header;
    private body: Body;
    private footer: Footer;

    constructor() {
        const appElement: HTMLElement = document.getElementById('app');
        // this.runAppInitAnimation(appElement);
        this.header = new Header(appElement);
        this.body = new Body(appElement);
        // this.footer = new Footer(appElement);

        setTimeout(() => this.body.initialize(), 1000);
    }

    private runAppInitAnimation(appElement: HTMLElement) {
        const bodyWrapperTemplate: string = require('./templates/app-wrapper.tpl.html');
        const bodyWrapperElement: HTMLElement = Utils.convertToDocumentFragment(bodyWrapperTemplate).firstElementChild as HTMLElement;
        const arcReactorTemplate: string = require('./templates/ArcReactor/arc-reactor.tpl.html');
        const arcReactorElement: HTMLElement = Utils.convertToDocumentFragment(arcReactorTemplate).firstElementChild as HTMLElement;
        bodyWrapperElement.appendChild(arcReactorElement);
        appElement.appendChild(bodyWrapperElement);
        arcReactorElement.addEventListener('animationend', () => appElement.removeChild(bodyWrapperElement));
    }
}

const app = new App();

export {
    app
}