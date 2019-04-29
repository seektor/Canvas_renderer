import { AbstractCanvas } from "../../CanvasRenderer/AbstractCanvas";
import { CSquareModel } from "./CSquareModel";
import { CSquareViewport } from "./CSquareViewport";

export class CStoc extends AbstractCanvas {

    protected model: CSquareModel;
    protected viewport: CSquareViewport;

    constructor(container: HTMLElement) {
        super(container);
        this.model = new CSquareModel();
        this.viewport = new CSquareViewport(container);
    }
}