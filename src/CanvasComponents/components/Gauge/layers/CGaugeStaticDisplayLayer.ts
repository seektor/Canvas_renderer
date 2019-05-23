import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CGaugeModel } from '../CGaugeModel';
import { CGaugeViewport } from '../CGaugeViewport';
import { CGaugePainter } from '../styles/CGaugePainter';

export class CGaugeStaticDisplayLayer extends AbstractCanvasLayer {

    protected model: CGaugeModel;
    private painter: CGaugePainter;

    constructor(params: TLayerParams<CGaugeModel, CGaugeViewport, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.painter.setGaugeDimensions(this.layerWidth);
        this.renderSelf();
    }

    protected updateParams(): void {
        this.painter.setGaugeDimensions(this.layerWidth);
    }

    public renderSelf(): void {
        this.painter.drawGauge(this.layerContext, this.getLayerRect(), '0%', '100%');
        this.notifyRenderChanges();
    }
}