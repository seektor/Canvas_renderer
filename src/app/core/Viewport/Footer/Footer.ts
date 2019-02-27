import { DomUtils } from "../../utils/DomUtils";

export class Footer {

    private footerElement: HTMLElement;

    constructor(hostElement: HTMLElement) {
        this.buildComponent(hostElement);
    }

    private buildComponent(hostElement: HTMLElement) {
        const template: string = require("./footer.html");
        const templateFragment: DocumentFragment = DomUtils.convertToDocumentFragment(template);
        this.footerElement = templateFragment.firstChild as HTMLElement;
        hostElement.append(this.footerElement);
    }
}