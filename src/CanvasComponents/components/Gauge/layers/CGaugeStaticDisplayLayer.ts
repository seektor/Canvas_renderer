import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TRange } from '../../../../CanvasRenderer/structures/TRange';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { Utils } from '../../../utils/Utils';
import { CGaugeModel } from '../CGaugeModel';
import { CGaugePainter } from '../styles/CGaugePainter';

export class CGaugeStaticDisplayLayer extends AbstractCanvasLayer {

    protected model: CGaugeModel;
    private painter: CGaugePainter;

    constructor(params: TLayerParams<CGaugeModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    private getGaugeLayerRect(): TRect {
        return Utils.getBiggestSquareRect(this.layerWidth, this.layerHeight);
    }

    public renderSelf(): void {
        this.clear();
        const gaugeRange: TRange = this.model.getGaugeRange();
        this.painter.fillRect(this.layerContext, this.getGaugeLayerRect(), { fillStyle: "orange" });
        this.painter.drawGauge(this.layerContext, this.getGaugeLayerRect(), gaugeRange.from, gaugeRange.to);
        this.notifyRenderChanges();
    }
}