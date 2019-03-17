import { DomUtils } from "../../utils/DomUtils";

export class Header {

    private headerElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    private construct(hostElement: HTMLElement) {
        const template: string = require("./header.html");
        const templateFragment: DocumentFragment = DomUtils.convertToDocumentFragment(template);
        this.headerElement = templateFragment.firstChild as HTMLElement;
        hostElement.append(this.headerElement);
    }
}