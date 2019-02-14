import "./assets/styles/app.scss";
import { Header } from "./core/components/Header/Header";
import { Footer } from "./core/components/Footer/Footer";

class App {

    private header: Header;
    private footer: Footer;

    constructor() {
        const root: HTMLElement = document.getElementById("root");
        this.header = new Header(root);
        this.footer = new Footer(root);
    }
}

const app = new App();

export {
    app
}