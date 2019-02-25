import "./assets/styles/app.scss";
import { Header } from "./core/components/Header/Header";
import { Footer } from "./core/components/Footer/Footer";
import { Body } from "./core/components/Body/Body";

class App {

    private header: Header;
    private body: Body;
    private footer: Footer;

    constructor() {
        const root: HTMLElement = document.getElementById("root");
        this.header = new Header(root);
        this.body = new Body(root);
        this.footer = new Footer(root);
    }
}

const app = new App();

export {
    app
}