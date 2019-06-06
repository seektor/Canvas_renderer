import { AbstractCanvasMainStage } from '../../../../CanvasRenderer/AbstractCanvasMainStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { Utils } from '../../../utils/Utils';
import { CGaugeModel } from '../CGaugeModel';
import { CGaugeViewport } from '../CGaugeViewport';
import { CGaugeStaticDisplayLayer } from '../layers/CGaugeStaticDisplayLayer';
import { CGaugeValueLayer } from '../layers/CGaugeValueLayer';
import { CGaugePainter } from '../styles/CGaugePainter';


export class CGaugeMainStage extends AbstractCanvasMainStage {

    protected model: CGaugeModel;
    protected viewport: CGaugeViewport;
    private canvasPainter: CGaugePainter;

    constructor(params: TLayerParams<CGaugeModel, CGaugeViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.createLayers();
    }

    protected renderSelfLayer() {
        this.clear();
        this.canvasPainter.drawBackground(this.layerContext, this.getLayerRect());
    }

    private getGaugeLayerRectExtractor(): TLayerRenderParams {
        const gaugeLayerRect: TRect = Utils.getBiggestSquareRect(this.layerWidth, this.layerHeight);
        return {
            dX: gaugeLayerRect.x, dY: gaugeLayerRect.y, height: gaugeLayerRect.height, width: gaugeLayerRect.width
        };
    }

    protected createLayers(): void {
        const displayLayer: ILayer = new CGaugeStaticDisplayLayer({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: () => this.getGaugeLayerRectExtractor()
        });
        this.addLayer(displayLayer);

        const valueLayer: ILayer = new CGaugeValueLayer({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: () => this.getGaugeLayerRectExtractor()
        });
        this.addLayer(valueLayer);
    }
}