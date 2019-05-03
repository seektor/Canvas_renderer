import './assets/styles/app.scss';
import { Header } from './components/Header/Header';
import { Body } from './components/Body/Body';
import { Footer } from './components/Footer/Footer';

class App {

    private header: Header;
    private body: Body;
    private footer: Footer;

    constructor() {
        const appElement: HTMLElement = document.getElementById('app');
        this.header = new Header(appElement);
        this.body = new Body(appElement);
        this.footer = new Footer(appElement);

        this.body.initialize();
    }
}

const app = new App();

export {
    app
}