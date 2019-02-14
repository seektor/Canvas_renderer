import "./assets/styles/app.scss";
import { Header } from "./core/components/Header/Header";

class App {

    private header: Header;

    constructor() {
        const root: HTMLElement = document.getElementById("root");
        this.header = new Header(root);
    }
}

const app = new App();

export {
    app
}