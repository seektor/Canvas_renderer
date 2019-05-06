import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { CRectBaseLayer } from '../../../testLayers/RectBaseLayer/CRectBaseLayer';
import Colors from '../../../../UIHelpers/Colors';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderBaseLayer } from '../layers/CVerticalSliderBaseLayer';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CVerticalSliderHandlerLayer } from '../layers/CVerticalSliderHandleLayer';

export class CVerticalSliderTrackStage extends AbstractCanvasStage {

    protected model: CVerticalSliderModel;

    constructor(layerHost: ILayerHost, model: CVerticalSliderModel, layerParamsExtractor: ILayerParamsExtractor) {
        super(layerHost, model, layerParamsExtractor);
        this.createLayers();
        this.renderSelf();
    }

    protected createLayers(): void {
        const handleLayer: ILayer = new CVerticalSliderHandlerLayer(this, this.model, (_layer) => this.model.getViewState().handleRect);
        this.addLayer(handleLayer);
    }
}