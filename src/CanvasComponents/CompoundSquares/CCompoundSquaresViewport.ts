import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { TDimensions } from "../../CanvasRenderer/structures/TDimensions";
import { Utils as CRUtils } from "../../CanvasRenderer/utils/Utils";
import { AbstractCanvasBaseLayer } from "../../CanvasRenderer/AbstractCanvasBaseLayer";
import { Utils } from "../utils/Utils";
import { CRectBaseLayer } from "../testLayers/RectBaseLayer/CRectBaseLayer";

export class CCompoundSquaresViewport extends AbstractCanvasViewport {

    constructor(container: HTMLElement) {
        super(container);
        this.createLayers();
        this.renderView();
    }

    protected createLayers() {
        const displayDimensions: TDimensions = this.canvasViewportRenderer.getViewportDimensions();
        this.canvasViewportRenderer.addPhysicalLayer();
        const layer: AbstractCanvasBaseLayer = new CRectBaseLayer({
            backgroundColor: Utils.getRandomColor(),
            height: displayDimensions.height,
            width: displayDimensions.width,
            dX: 0,
            dY: 0
        })
        this.canvasViewportRenderer.addBaseLayer(0, layer);
    }
}