import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CFlatDisplayModel } from '../CFlatDisplayModel';
import { CFlatDisplayViewport } from '../CFlatDisplayViewport';
import { CFlatDisplayContentLayer } from '../layers/CFlatDisplayContentLayer';
import { CFlatDisplayPainter } from '../styles/CFlatDisplayPainter';


export class CFlatDisplayMainStage extends AbstractCanvasStage {

    protected model: CFlatDisplayModel;
    protected viewport: CFlatDisplayViewport;
    private painter: CFlatDisplayPainter;

    constructor(params: TLayerParams<CFlatDisplayModel, CFlatDisplayViewport, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.createLayers();
    }

    protected renderSelfLayer() {
        this.model.getCanvasPainter().drawBackground(this.layerContext, this.getLayerRect());
    }

    protected createLayers(): void {
        const contentLayer: ILayer = new CFlatDisplayContentLayer({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: () => ({
                dX: 0, dY: 0, height: this.layerHeight, width: this.layerWidth
            })
        });
        this.addLayer(contentLayer);
    }
}