import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { TDimensions } from "../../CanvasRenderer/structures/TDimensions";
import { Utils as CRUtils } from "../../CanvasRenderer/utils/Utils";
import { AbstractCanvasBaseLayer } from "../../CanvasRenderer/AbstractCanvasBaseLayer";
import { SquareLayer } from "../testLayers/SquareLayer/SquareLayer";
import { Utils } from "../utils/Utils";

export class CanvasStocViewport extends AbstractCanvasViewport {

    constructor(container: HTMLElement) {
        super(container);
        this.createLayers();
        this.render();
    }

    protected createLayers() {
        // const displayDimensions: TDimensions = CRUtils.getElementDimensions(this.displayCanvas);
        // const squareDimension: number = 20;
        this.canvasViewportRenderer.addPhysicalLayer();
        this.canvasViewportRenderer.addPhysicalLayer();


        // for (let layerIndex = 0; layerIndex < 2000; layerIndex++) {
        //     const layer: AbstractCanvasBaseLayer = new SquareLayer({
        //         backgroundColor: Utils.getRandomColor(),
        //         height: squareDimension,
        //         width: squareDimension,
        //         dX: Utils.getRandomInt(0, displayDimensions.width - squareDimension),
        //         dY: Utils.getRandomInt(0, displayDimensions.height - squareDimension)
        //     })
        //     this.layersRenderer.addLayer(layer);
        // }
    }
}