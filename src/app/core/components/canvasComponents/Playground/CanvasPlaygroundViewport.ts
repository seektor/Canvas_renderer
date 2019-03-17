import { AbstractCanvasViewport } from "../../../CanvasRenderer/AbstractCanvasViewport";
import { CanvasPlaygroundBaseLayer } from "./layers/CanvasPlaygroundBasePlane";
import { TDimensions } from "../../../structures/TDimensions";

export class CanvasPlaygroundViewport extends AbstractCanvasViewport {

    constructor(container: HTMLElement) {
        super(container);
        this.construct();
        this.render();
    }

    protected construct() {
        const layerDimensions: TDimensions = this.getElementDimensions(this.displayCanvas);
        this.layers.push(new CanvasPlaygroundBaseLayer({
            layerHeight: layerDimensions.height,
            layerWidth: layerDimensions.width,
        }))
    }
}