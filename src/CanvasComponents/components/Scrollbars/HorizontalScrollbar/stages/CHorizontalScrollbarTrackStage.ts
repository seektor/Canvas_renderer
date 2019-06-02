import { AbstractCanvasStage } from '../../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CHorizontalScrollbarModel } from '../CHorizontalScrollbarModel';
import { CHorizontalScrollbarViewport } from '../CHorizontalScrollbarViewport';
import { CHorizontalScrollbarHandleLayer } from '../layers/CHorizontalScrollbarHandleLayer';

export class CHorizontalScrollbarTrackStage extends AbstractCanvasStage {

    protected viewport: CHorizontalScrollbarViewport;
    protected model: CHorizontalScrollbarModel;

    constructor(params: TLayerParams<CHorizontalScrollbarModel, CHorizontalScrollbarViewport, unknown>) {
        super(params);
        this.createLayers();
    }

    private getHandlerLayerParams(): TLayerRenderParams {
        return {
            dX: 0,
            dY: 0,
            height: this.layerHeight,
            width: this.model.getDisplayHandleWidth()
        }
    }

    protected createLayers(): void {
        const handleLayer: ILayer = new CHorizontalScrollbarHandleLayer({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: (_layer) => this.getHandlerLayerParams()
        });
        this.addLayer(handleLayer);
    }
}