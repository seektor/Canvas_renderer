import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CGaugeModel } from '../CGaugeModel';
import { CGaugeViewport } from '../CGaugeViewport';
import { CGaugePainter } from '../styles/CGaugePainter';

export class CGaugeStaticDisplayLayer extends AbstractCanvasLayer {

    protected model: CGaugeModel;
    protected viewport: CGaugeViewport;
    private canvasPainter: CGaugePainter;

    constructor(params: TLayerParams<CGaugeModel, CGaugeViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.canvasPainter.setGaugeDimensions(this.layerWidth);
        this.renderSelf();
        this.notifyRenderChanges();
    }

    protected onLayerDidResize(): void {
        this.canvasPainter.setGaugeDimensions(this.layerWidth);
    }

    public renderSelf(): void {
        this.clear();
        this.canvasPainter.drawGauge(this.layerContext, this.getLayerRect(), '0%', '100%');
    }
}