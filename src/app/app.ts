import "./assets/styles/app.scss";
import { Header } from "./components/Header/Header";
import { Body } from "./components/Body/Body";
import { Footer } from "./components/Footer/Footer";

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