import { AbstractCanvas } from "../../CanvasRenderer/AbstractCanvas";
import { CCompoundSquaresModel } from "./CCompoundSquaresModel";
import { CCompoundSquaresViewport } from "./CCompoundSquaresViewport";

export class CStoc extends AbstractCanvas {

    protected model: CCompoundSquaresModel;
    protected viewport: CCompoundSquaresViewport;

    constructor(container: HTMLElement) {
        super(container);
        this.model = new CCompoundSquaresModel();
        this.viewport = new CCompoundSquaresViewport(container);
    }
}