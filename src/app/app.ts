import "./assets/styles/app.scss";
import { Header } from "./core/Viewport/Header/Header";
import { Body } from "./core/Viewport/Body/Body";
import { Footer } from "./core/Viewport/Footer/Footer";

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