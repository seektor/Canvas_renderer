import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { TDimensions } from "../../CanvasRenderer/structures/TDimensions";
import { Utils as CRUtils } from "../../CanvasRenderer/utils/Utils";
import { AbstractCanvasBaseLayer } from "../../CanvasRenderer/AbstractCanvasBaseLayer";
import { Utils } from "../utils/Utils";
import { CRectLayer } from "../testLayers/RectLayer/CRectLayer";

export class CPlaygroundViewport extends AbstractCanvasViewport {

    constructor(container: HTMLElement) {
        super(container);
        this.createLayers();
        this.renderView();
    }

    protected createLayers() {
        this.canvasViewportRenderer.addPhysicalLayer();
    }
}