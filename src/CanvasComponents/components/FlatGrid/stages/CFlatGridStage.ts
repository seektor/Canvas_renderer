import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { CFlatGridModel } from '../CFlatGridModel';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CRectBaseLayer } from '../../../commonLayers/RectBaseLayer/CRectBaseLayer';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { TLayerRect } from '../../../../CanvasRenderer/structures/TLayerRect';
import ThemingService from '../../../../app/services/themingService/ThemingService';
import { CFlatGridHeaderLayer } from '../layers/CFlatGridHeaderLayer';

export class CFlatGridStage extends AbstractCanvasStage {

    protected model: CFlatGridModel;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.createLayers();
    }

    protected createLayers(): void {
        const headerLayer: ILayer = new CFlatGridHeaderLayer({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: (_layer) => ({
                dX: this.dX,
                dY: this.dY,
                height: this.layerHeight,
                width: this.layerWidth
            })
        });
        this.addLayer(headerLayer);

        // const flatGridStage: ILayer = new CFLatGridStage(this, this.model, (_layer) => this.model.getDisplayRect());
        // this.addLayer(headerLayer);
    }
}