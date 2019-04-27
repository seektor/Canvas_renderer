import { AbstractCanvas } from "../../CanvasRenderer/AbstractCanvas";
import { CanvasStocModel } from "./CanvasStocModel";
import { CanvasStocViewport } from "./CanvasStocViewport";

export class CanvasStoc extends AbstractCanvas {

    protected model: CanvasStocModel;
    protected viewport: CanvasStocViewport;

    constructor(container: HTMLElement) {
        super(container);
        this.model = new CanvasStocModel();
        this.viewport = new CanvasStocViewport(container);
    }
}