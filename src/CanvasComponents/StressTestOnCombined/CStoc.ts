import { AbstractCanvas } from "../../CanvasRenderer/AbstractCanvas";
import { CStocModel } from "./CStocModel";
import { CStocViewport } from "./CStocViewport";

export class CStoc extends AbstractCanvas {

    protected model: CStocModel;
    protected viewport: CStocViewport;

    constructor(container: HTMLElement) {
        super(container);
        this.model = new CStocModel();
        this.viewport = new CStocViewport(container);
    }
}