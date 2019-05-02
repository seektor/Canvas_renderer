import { AbstractCanvas } from "../../CanvasRenderer/AbstractCanvas";
import { CFlatGridModel } from "./CFlatGridModel";
import { CFlatGridViewport } from "./CFlatGridViewport";

export class CFlatGrid extends AbstractCanvas {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;

    constructor(container: HTMLElement) {
        super();
        this.model = new CFlatGridModel();
        this.viewport = new CFlatGridViewport(container);
    }
}