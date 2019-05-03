import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { CRectBaseLayer } from "../testLayers/RectBaseLayer/CRectBaseLayer";
import { TDimensions } from "../../CanvasRenderer/structures/TDimensions";
import { ILayer } from "../../CanvasRenderer/interfaces/ILayer";
import Colors from "../../UIHelpers/Colors";
import { TViewportParams } from "../../CanvasRenderer/structures/TViewportParams";

export class CVerticalSliderViewport extends AbstractCanvasViewport {

    constructor(params: TViewportParams) {
        super(params);
        this.createLayers();
        this.renderStage();
    }

    protected createLayers() {
        const stageDimensions: TDimensions = this.getStageDimensions();
        const backgroundLayer: ILayer = new CRectBaseLayer({ backgroundColor: Colors.RED, height: stageDimensions.height, width: stageDimensions.width });
        this.addLayer(backgroundLayer);
    }
}