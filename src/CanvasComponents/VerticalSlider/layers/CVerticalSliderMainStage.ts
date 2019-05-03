import { AbstractCanvasStage } from '../../../CanvasRenderer/AbstractCanvasStage';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { TRenderLayer } from '../../../CanvasRenderer/structures/TRenderLayer';
import { ILayer } from '../../../CanvasRenderer/interfaces/ILayer';
import { CRectBaseLayer } from '../../testLayers/RectBaseLayer/CRectBaseLayer';
import Colors from '../../../UIHelpers/Colors';
import { ILayerPosAndDimExtractor } from '../../../CanvasRenderer/interfaces/ILayerPosAndDimExtractor';

export class CVerticalSliderMainStage extends AbstractCanvasStage {

    constructor(layerHost: ILayerHost, layerParams: TRenderLayer) {
        super(layerHost, layerParams);
        this.createLayers();
        this.renderSelf();
    }

    protected createLayers(): void {

        const backgroundLayer: ILayer = new CRectBaseLayer(this, { backgroundColor: Colors.RED, height: this.layerHeight, width: this.layerWidth });
        const backgroundLayerPosAndDimExtractor: ILayerPosAndDimExtractor = (layer) => ({
            dX: 0, dY: 0,
            height: this.layerHeight, width: this.layerWidth
        });
        this.addLayer(backgroundLayer, backgroundLayerPosAndDimExtractor);
    }
}