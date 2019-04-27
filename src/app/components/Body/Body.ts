import { DomUtils } from "../../utils/DomUtils";
import { CanvasPlayground } from "../../../CanvasComponents/Playground/CanvasPlayground";

export class Body {

    private bodyElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    private construct(container: HTMLElement) {
        const template: string = require("./body.html");
        const templateFragment: DocumentFragment = DomUtils.convertToDocumentFragment(template);
        this.bodyElement = templateFragment.firstChild as HTMLElement;
        container.append(this.bodyElement);
        new CanvasPlayground(this.bodyElement);
    }
}