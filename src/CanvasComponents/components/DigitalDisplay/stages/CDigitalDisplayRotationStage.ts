import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CDigitalDisplayModel } from '../CDigitalDIsplayModel';
import { CDigitalDisplayViewport } from '../CDigitalDisplayViewport';
import { CDigitalDisplayRotatorLayer } from '../layers/CDigitalDisplayRotatorLayer';

export class CDigitalDisplayRotationStage extends AbstractCanvasStage {

    protected model: CDigitalDisplayModel;
    protected viewport: CDigitalDisplayViewport;

    constructor(params: TLayerParams<CDigitalDisplayModel, CDigitalDisplayViewport, unknown>) {
        super(params);
        this.createLayers();
    }

    protected createLayers(): void {
        const rotatorLayer: ILayer = new CDigitalDisplayRotatorLayer({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: () => ({
                dX: 0, dY: 0, height: this.layerHeight, width: this.layerWidth
            })
        });
        this.addLayer(rotatorLayer);
    }
}