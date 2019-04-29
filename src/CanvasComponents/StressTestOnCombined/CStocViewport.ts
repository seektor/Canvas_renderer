import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { TDimensions } from "../../CanvasRenderer/structures/TDimensions";
import { Utils as CRUtils } from "../../CanvasRenderer/utils/Utils";
import { AbstractCanvasBaseLayer } from "../../CanvasRenderer/AbstractCanvasBaseLayer";
import { Utils } from "../utils/Utils";
import { CRectBaseLayer } from "../testLayers/RectBaseLayer/CRectBaseLayer";

export class CStocViewport extends AbstractCanvasViewport {

    constructor(container: HTMLElement) {
        super(container);
        // this.createLayers();
        // this.renderView();
    }

    protected createLayers() {
        //     const displayDimensions: TDimensions = this.canvasViewportRenderer.getViewportDimensions();
        //     const squareDimension: number = 20;
        //     this.canvasViewportRenderer.addPhysicalLayer();

        //     for (let layerIndex = 0; layerIndex < 2000; layerIndex++) {
        //         const layer: AbstractCanvasBaseLayer = new CRectLayer({
        //             backgroundColor: Utils.getRandomColor(),
        //             height: squareDimension,
        //             width: squareDimension,
        //             dX: Utils.getRandomInt(0, displayDimensions.width - squareDimension),
        //             dY: Utils.getRandomInt(0, displayDimensions.height - squareDimension)
        //         })
        //         this.canvasViewportRenderer.addBaseLayer(0, layer);
        //     }
    }
}