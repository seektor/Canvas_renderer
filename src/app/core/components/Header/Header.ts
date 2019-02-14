import { DomUtils } from "../../utils/DomUtils";

export class Header {

    private headerElement: HTMLElement;

    constructor(hostElement: HTMLElement) {
        this.buildComponent(hostElement);
    }

    private buildComponent(hostElement: HTMLElement) {
        const template: string = require("./header.html");
        const templateFragment: DocumentFragment = DomUtils.convertToDocumentFragment(template);
        this.headerElement = templateFragment.firstChild as HTMLElement;
        hostElement.append(this.headerElement);
    }
}