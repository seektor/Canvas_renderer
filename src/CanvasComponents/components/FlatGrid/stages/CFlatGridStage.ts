import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { CFlatGridModel } from '../CFlatGridModel';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CFlatGridHeaderLayer } from '../layers/CFlatGridHeaderLayer';

export class CFlatGridStage extends AbstractCanvasStage {

    protected model: CFlatGridModel;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.createLayers();
    }

    private getHeaderLayerParams(layer: ILayer): TLayerRenderParams {
        const headerWidth: number = this.model.calculateHeaderWidth();
        return {
            dX: this.dX,
            dY: this.dY,
            height: 40,
            width: Math.max(headerWidth, this.layerWidth),
            sWidth: Math.min(headerWidth, this.layerWidth),
            dWidth: Math.min(headerWidth, this.layerWidth),
        }
    }

    protected createLayers(): void {
        const headerLayer: ILayer = new CFlatGridHeaderLayer({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: (layer) => this.getHeaderLayerParams(layer)
        });
        this.addLayer(headerLayer);

        // const flatGridStage: ILayer = new CFLatGridStage(this, this.model, (_layer) => this.model.getDisplayRect());
        // this.addLayer(headerLayer);
    }
}