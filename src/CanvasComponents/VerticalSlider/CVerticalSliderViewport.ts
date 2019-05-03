import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { CRectBaseLayer } from "../testLayers/RectBaseLayer/CRectBaseLayer";
import { TDimensions } from "../../CanvasRenderer/structures/TDimensions";
import { ILayer } from "../../CanvasRenderer/interfaces/ILayer";
import Colors from "../../UIHelpers/Colors";
import { TViewportParams } from "../../CanvasRenderer/structures/TViewportParams";
import { TLayerRelativePosition } from "../../CanvasRenderer/structures/TLayerRelativePosition";

export class CVerticalSliderViewport extends AbstractCanvasViewport {

    constructor(params: TViewportParams) {
        super(params);
        this.createLayers();
        this.renderStage();
    }

    public getSubLayerRelativePosition(subLayer: ILayer): TLayerRelativePosition | null {
        switch (subLayer) {
            case (this.getMainStage()):
                const containerDimensions: TDimensions = this.getContainerDimensions();
                return { dX: 0, dY: 0, ...containerDimensions };
            // case (this.subComponents[0].getMainStage()):
            //     return this.horizontalSliderPosition;
            default:
                const stageDimensions: TDimensions = this.getStageDimensions();
                return {
                    dX: 0,
                    dY: 0,
                    height: stageDimensions.height,
                    width: stageDimensions.width
                }
        }
    }

    protected createLayers() {
        const stageDimensions: TDimensions = this.getStageDimensions();
        const backgroundLayer: ILayer = new CRectBaseLayer(this, { backgroundColor: Colors.RED, height: stageDimensions.height, width: stageDimensions.width });
        this.addLayer(backgroundLayer);
    }
}