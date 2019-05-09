import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CVerticalSliderHandleLayer } from '../layers/CVerticalSliderHandleLayer';
import { ILayerViewport } from '../../../../CanvasRenderer/interfaces/ILayerViewport';

export class CVerticalSliderTrackStage extends AbstractCanvasStage {

    protected model: CVerticalSliderModel;

    constructor(layerHost: ILayerHost, globalViewport: ILayerViewport, model: CVerticalSliderModel, layerParamsExtractor: ILayerParamsExtractor) {
        super(layerHost, globalViewport, model, layerParamsExtractor);
        this.createLayers();
    }

    protected createLayers(): void {
        const handleLayer: ILayer = new CVerticalSliderHandleLayer(this, this.globalViewport, this.model, (_layer) => ({
            dX: 0,
            dY: 0,
            height: this.layerHeight * 0.25,
            width: this.layerWidth
        }));
        this.addLayer(handleLayer);
    }
}