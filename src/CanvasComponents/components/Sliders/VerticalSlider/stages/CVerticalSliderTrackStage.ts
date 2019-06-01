import { AbstractCanvasStage } from '../../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderViewport } from '../CVerticalSliderViewport';
import { CVerticalSliderHandleLayer } from '../layers/CVerticalSliderHandleLayer';

export class CVerticalSliderTrackStage extends AbstractCanvasStage {

    protected viewport: CVerticalSliderViewport;
    protected model: CVerticalSliderModel;

    constructor(params: TLayerParams<CVerticalSliderModel, CVerticalSliderViewport, unknown>) {
        super(params);
        this.createLayers();
    }

    private getHandlerLayerParams(): TLayerRenderParams {
        return {
            dX: 0,
            dY: 0,
            height: this.model.getDisplayHandleHeight(),
            width: this.layerWidth
        }
    }

    protected createLayers(): void {
        const handleLayer: ILayer = new CVerticalSliderHandleLayer({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: (_layer) => this.getHandlerLayerParams()
        });
        this.addLayer(handleLayer);
    }
}