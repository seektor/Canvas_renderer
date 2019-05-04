import { AbstractCanvasStage } from "../../../../CanvasRenderer/AbstractCanvasStage";
import { ILayerHost } from "../../../../CanvasRenderer/interfaces/ILayerHost";
import { TRenderLayer } from "../../../../CanvasRenderer/structures/TRenderLayer";
import { ILayer } from "../../../../CanvasRenderer/interfaces/ILayer";
import { CRectBaseLayer } from "../../../testLayers/RectBaseLayer/CRectBaseLayer";
import Colors from "../../../../UIHelpers/Colors";
import { ILayerPosAndDimExtractor } from "../../../../CanvasRenderer/interfaces/ILayerPosAndDimExtractor";
import { CVerticalSlider } from "../../VerticalSlider/CVerticalSlider";

export class CFlatGridMainStage extends AbstractCanvasStage {

    constructor(layerHost: ILayerHost, layerParams: TRenderLayer) {
        super(layerHost, layerParams);
        this.createLayers();
        this.renderSelf();
    }

    protected createLayers() {
        const horizontalScrollHeight: number = 20;
        const verticalScrollWidth: number = 20;

        const backgroundLayerPosAndDimExtractor: ILayerPosAndDimExtractor = (layer) => ({
            dX: this.dX, dY: this.dY,
            height: this.layerHeight, width: this.layerWidth
        });
        const backgroundLayer: ILayer = new CRectBaseLayer(this, { backgroundColor: Colors.LIGHT_GREEN, ...backgroundLayerPosAndDimExtractor(null) });
        this.addLayer(backgroundLayer, backgroundLayerPosAndDimExtractor);

        const contentLayerPosAndDimExtractor: ILayerPosAndDimExtractor = (layer) => ({
            dX: 0, dY: 0,
            height: Math.max(0, this.layerHeight - horizontalScrollHeight),
            width: Math.max(0, this.layerWidth - verticalScrollWidth)
        });
        const contentLayer: ILayer = new CRectBaseLayer(this, { backgroundColor: Colors.LIGHT_BLUE, ...contentLayerPosAndDimExtractor(null) });
        this.addLayer(contentLayer, contentLayerPosAndDimExtractor);

        const verticalSlider: CVerticalSlider = new CVerticalSlider();
        const verticalSliderLayerPosAndDimExtractor: ILayerPosAndDimExtractor = (layer: ILayer) => ({
            dX: Math.max(0, this.layerWidth - verticalScrollWidth),
            dY: 0,
            height: Math.max(0, this.layerHeight - horizontalScrollHeight),
            width: verticalScrollWidth
        });
        verticalSlider.createViewport({
            container: this.getContainerElement(), stageParams: {
                displayCanvas: this.getDisplayCanvas(),
                layerHost: this,
                layerPosAndDim: verticalSliderLayerPosAndDimExtractor(null)
            }
        });
        this.addComponent(verticalSlider, verticalSliderLayerPosAndDimExtractor);
    }
}