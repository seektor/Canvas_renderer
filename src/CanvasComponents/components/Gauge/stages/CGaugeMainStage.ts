import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { Utils } from '../../../utils/Utils';
import { CGaugeModel } from '../CGaugeModel';
import { CGaugeStaticDisplayLayer } from '../layers/CGaugeStaticDisplayLayer';
import { CGaugeValueLayer } from '../layers/CGaugeValueLayer';
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

    private getGaugeLayerRectExtractor(): TLayerRenderParams {
        const gaugeLayerRect: TRect = Utils.getBiggestSquareRect(this.layerWidth, this.layerHeight);
        return {
            dX: gaugeLayerRect.x, dY: gaugeLayerRect.y, height: gaugeLayerRect.height, width: gaugeLayerRect.width
        };
    }

    protected createLayers(): void {
        const displayLayer: ILayer = new CGaugeStaticDisplayLayer({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: () => this.getGaugeLayerRectExtractor()
        });
        this.addLayer(displayLayer);

        const valueLayer: ILayer = new CGaugeValueLayer({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: () => this.getGaugeLayerRectExtractor()
        });
        this.addLayer(valueLayer);
    }
}