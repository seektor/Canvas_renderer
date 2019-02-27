import { DomUtils } from "../../utils/DomUtils";

export class Body {

    private bodyElement: HTMLElement;

    constructor(hostElement: HTMLElement) {
        this.buildComponent(hostElement);
    }

    private buildComponent(hostElement: HTMLElement) {
        const template: string = require("./body.html");
        const templateFragment: DocumentFragment = DomUtils.convertToDocumentFragment(template);
        this.bodyElement = templateFragment.firstChild as HTMLElement;
        hostElement.append(this.bodyElement);
    }
}