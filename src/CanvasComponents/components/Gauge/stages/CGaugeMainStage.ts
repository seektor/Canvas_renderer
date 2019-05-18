import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CGaugeModel } from '../CGaugeModel';
import { CGaugeStaticDisplayLayer } from '../layers/CGaugeStaticDisplayLayer';
import { CGaugePainter } from '../styles/CGaugePainter';


export class CGaugeMainStage extends AbstractCanvasStage {

    protected model: CGaugeModel;
    private painter: CGaugePainter;

    constructor(params: TLayerParams<CGaugeModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.createLayers();
    }

    protected renderSelfLayer() {
        this.model.getCanvasPainter().drawBackground(this.layerContext, this.getLayerRect());
    }

    protected createLayers(): void {
        const displayLayer: ILayer = new CGaugeStaticDisplayLayer({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: () => ({
                dX: 0, dY: 0, height: this.layerHeight, width: this.layerWidth
            })
        });
        this.addLayer(displayLayer);
    }
}