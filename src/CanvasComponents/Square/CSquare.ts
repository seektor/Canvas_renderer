import { AbstractCanvas } from "../../CanvasRenderer/AbstractCanvas";

export class CStoc extends AbstractCanvas {

    protected model: CSquareM;
    protected viewport: CStocViewport;

    constructor(container: HTMLElement) {
        super(container);
        this.model = new CStocModel();
        this.viewport = new CStocViewport(container);
    }
}