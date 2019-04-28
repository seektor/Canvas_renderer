import { Utils } from "../../utils/Utils";
import { CStoc } from "../../../CanvasComponents/StressTestOnCombined/CStoc";
import { CPlayground } from "../../../CanvasComponents/Playground/CPlayground";

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
        new CPlayground(this.bodyElement);
    }
}