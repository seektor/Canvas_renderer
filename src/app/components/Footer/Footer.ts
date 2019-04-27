import { Utils } from "../../utils/Utils";

export class Footer {

    private footerElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    private construct(hostElement: HTMLElement) {
        const template: string = require("./footer.html");
        const templateFragment: DocumentFragment = Utils.convertToDocumentFragment(template);
        this.footerElement = templateFragment.firstChild as HTMLElement;
        hostElement.append(this.footerElement);
    }
}