import { AbstractCanvas } from "../../CanvasRenderer/AbstractCanvas";
import { CPlaygroundModel } from "./CPlaygroundModel";
import { CPlaygroundViewport } from "./CPlaygroundViewport";

export class CPlayground extends AbstractCanvas {

    protected model: CPlaygroundModel;
    protected viewport: CPlaygroundViewport;

    constructor(container: HTMLElement) {
        super(container);
        this.model = new CPlaygroundModel();
        this.viewport = new CPlaygroundViewport(container);
    }
}