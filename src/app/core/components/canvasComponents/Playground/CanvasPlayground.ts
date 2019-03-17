import { AbstractCanvas } from "../../../CanvasRenderer/AbstractCanvas";
import { CanvasPlaygroundModel } from "./CanvasPlaygroundModel";
import { CanvasPlaygroundViewport } from "./CanvasPlaygroundViewport";

export class CanvasPlayground extends AbstractCanvas {

    protected model: CanvasPlaygroundModel;
    protected viewport: CanvasPlaygroundViewport;

    constructor(container: HTMLElement) {
        super(container);
        this.model = new CanvasPlaygroundModel();
        this.viewport = new CanvasPlaygroundViewport(container);
    }
}