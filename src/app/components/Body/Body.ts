import { Utils } from "../../utils/Utils";
import { CanvasStoc } from "../../../CanvasComponents/StressTestOnCombined/CanvasStoc";

export class Body {

    private bodyElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    private construct(container: HTMLElement) {
        const template: string = require("./body.html");
        const templateFragment: DocumentFragment = Utils.convertToDocumentFragment(template);
        this.bodyElement = templateFragment.firstChild as HTMLElement;
        container.append(this.bodyElement);
        new CanvasStoc(this.bodyElement);
    }
}