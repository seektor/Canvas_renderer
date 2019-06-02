import { AbstractCanvasStage } from '../../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CVerticalScrollbarModel } from '../CVerticalScrollbarModel';
import { CVerticalScrollbarViewport } from '../CVerticalScrollbarViewport';
import { CVerticalScrollbarHandleLayer } from '../layers/CVerticalScrollbarHandleLayer';

export class CVerticalScrollbarTrackStage extends AbstractCanvasStage {

    protected viewport: CVerticalScrollbarViewport;
    protected model: CVerticalScrollbarModel;

    constructor(params: TLayerParams<CVerticalScrollbarModel, CVerticalScrollbarViewport, unknown>) {
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
        const handleLayer: ILayer = new CVerticalScrollbarHandleLayer({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: (_layer) => this.getHandlerLayerParams()
        });
        this.addLayer(handleLayer);
    }
}