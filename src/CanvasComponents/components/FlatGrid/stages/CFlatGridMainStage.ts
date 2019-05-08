import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { CFlatGridModel } from '../CFlatGridModel';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { ILayerViewport } from '../../../../CanvasRenderer/interfaces/ILayerViewport';

export class CFlatGridMainStage extends AbstractCanvasStage {

    protected model: CFlatGridModel;

    constructor(layerHost: ILayerHost, globalViewport: ILayerViewport, model: CFlatGridModel, layerParamsExtractor: ILayerParamsExtractor) {
        super(layerHost, globalViewport, model, layerParamsExtractor);
        this.createLayers();
        this.renderSelf();
    }

    protected createLayers(): void {
        // const flatGridStage: ILayer = new CFLatGridStage(this, this.model, (_layer) => this.model.getDisplayRect());
        // this.addLayer(headerLayer);
    }
}