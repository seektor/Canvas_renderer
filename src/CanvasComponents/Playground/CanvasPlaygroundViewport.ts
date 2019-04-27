import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { CanvasPlaygroundBaseLayer } from "./layers/CanvasPlaygroundBaseLayer";
import { TDimensions } from "../../app/structures/TDimensions";

export class CanvasPlaygroundViewport extends AbstractCanvasViewport {

    constructor(container: HTMLElement) {
        super(container);
        this.construct();
        this.render();
    }

    protected construct() {
        const layerDimensions: TDimensions = this.getElementDimensions(this.displayCanvas);
        // this.layers.push(new CanvasPlaygroundBaseLayer({
        //     height: layerDimensions.height,
        //     width: layerDimensions.width,
        // }))
    }
}