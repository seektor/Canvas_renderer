import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { CRectBaseLayer } from '../../../testLayers/RectBaseLayer/CRectBaseLayer';
import Colors from '../../../../UIHelpers/Colors';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderBaseLayer } from '../layers/CVerticalSliderBaseLayer';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';

export class CVerticalSliderMainStage extends AbstractCanvasStage {

    protected model: CVerticalSliderModel;

    constructor(layerHost: ILayerHost, model: CVerticalSliderModel, layerParamsExtractor: ILayerParamsExtractor) {
        super(layerHost, model, layerParamsExtractor);
        this.createLayers();
        this.renderSelf();
    }

    protected createLayers(): void {
        const baseLayer: ILayer = new CVerticalSliderBaseLayer(this, this.model, (_layer) => this.model.getDisplayRect());
        this.addLayer(baseLayer);
    }
}