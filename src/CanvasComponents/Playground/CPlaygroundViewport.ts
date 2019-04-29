import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { TDimensions } from "../../CanvasRenderer/structures/TDimensions";
import { Utils as CRUtils } from "../../CanvasRenderer/utils/Utils";
import { AbstractCanvasBaseLayer } from "../../CanvasRenderer/AbstractCanvasBaseLayer";
import { Utils } from "../utils/Utils";
import { CRectBaseLayer } from "../testLayers/RectBaseLayer/CRectBaseLayer";
import { CSquaresCompoundLayer } from "../testLayers/SquaresCompoundLayer/CSquaresCompoundLayer";

export class CPlaygroundViewport extends AbstractCanvasViewport {

    constructor(container: HTMLElement) {
        super(container);
        this.createLayers();
        this.renderView();
    }

    protected createLayers() {
        this.canvasViewportRenderer.addPhysicalLayer();
        this.canvasViewportRenderer.addPhysicalLayer();
        // const squaresCompoundLayer = new CSquaresCompoundLayer({
        //     height: 500,
        //     width: 500
        // },
        //     this.viewportElement);
        // const squareLayer = new CRectBaseLayer({
        //     backgroundColor: Utils.getRandomColor(),
        //     height: 100,
        //     width: 100,
        // })
        // this.canvasViewportRenderer.addBaseLayer(0, squaresCompoundLayer);
    }
}