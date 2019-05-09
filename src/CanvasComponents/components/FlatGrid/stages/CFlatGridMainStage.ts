import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { CFlatGridModel } from '../CFlatGridModel';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';

export class CFlatGridMainStage extends AbstractCanvasStage {

    protected model: CFlatGridModel;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.createLayers();
    }

    protected createLayers(): void {
        // const flatGridStage: ILayer = new CFLatGridStage(this, this.model, (_layer) => this.model.getDisplayRect());
        // this.addLayer(headerLayer);
    }
}