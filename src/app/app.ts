import './assets/styles/app.scss';
import { Body } from './components/Body/Body';
import { ConfigSection } from './components/ConfigSection/ConfigSection';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Utils } from './utils/Utils';

class App {

    private appElement: HTMLElement;
    private header: Header;
    private body: Body;
    private footer: Footer;
    private configComponent: ConfigSection;

    constructor() {
        this.appElement = document.getElementById('app');
        // this.runAppInitAnimation(this.appElement);
        this.header = new Header(this.appElement);
        this.body = new Body(this.appElement);
        // this.footer = new Footer(this.appElement);
        this.configComponent = new ConfigSection(this.body.getElement(), (isPrimary: boolean) => this.onThemeChange(isPrimary));
        this.header.setConfigCallback(this.configComponent.getToggleCallback());

        setTimeout(() => this.body.initialize(), 1000);
    }

    private onThemeChange(isPrimary: boolean): void {
        if (isPrimary) {
            this.appElement.setAttribute('theme', '');
        } else {
            this.appElement.setAttribute('theme', 'light');
        }
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

export { app };

