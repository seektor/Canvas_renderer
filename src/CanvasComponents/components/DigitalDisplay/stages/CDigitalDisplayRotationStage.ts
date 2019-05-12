import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CDigitalDisplayModel } from '../CDigitalDIsplayModel';
import { CDigitalDisplayRotatorLayer } from '../layers/CDigitalDisplayRotatorLayer';

export class CDigitalDisplayRotationStage extends AbstractCanvasStage {

    protected model: CDigitalDisplayModel;

    constructor(params: TLayerParams<CDigitalDisplayModel, unknown>) {
        super(params);
        this.createLayers();
    }

    protected createLayers(): void {
        const rotatorLayer: ILayer = new CDigitalDisplayRotatorLayer({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: () => ({
                dX: 0, dY: 0, height: this.layerHeight, width: this.layerWidth
            })
        });
        this.addLayer(rotatorLayer);
    }
}