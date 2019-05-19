import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TRange } from '../../../../CanvasRenderer/structures/TRange';
import { CGaugeModel } from '../CGaugeModel';
import { TGaugeDimensions } from '../structures/TGaugeDimensions';
import { CGaugePainter } from '../styles/CGaugePainter';

export class CGaugeValueLayer extends AbstractCanvasLayer {

    protected model: CGaugeModel;
    private painter: CGaugePainter;
    private gaugeDimensions: TGaugeDimensions;
    private gaugeAngleRange: TRange;

    constructor(params: TLayerParams<CGaugeModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.gaugeAngleRange = this.painter.getGaugeAngleRange();
        this.gaugeDimensions = this.painter.getGaugeDimensions();
        this.renderSelf();
    }

    public updateParams(): void {
        this.gaugeDimensions = this.painter.getGaugeDimensions();
    }

    public renderSelf(): void {
        const displayValue: string = this.model.getCurrentDisplayValue();
        const angleValue: number = this.model.getCurrentValueAsAngle();
        this.painter.drawValue(this.layerContext, this.getLayerRect(), displayValue, angleValue);
        this.notifyRenderChanges();
    }

    public isPierced(coords: TCoords): boolean {
        // https://www.geeksforgeeks.org/check-whether-point-exists-circle-sector-not/
        const normalizedX: number = coords.x - this.layerWidth * 0.5;
        const normalizedY: number = coords.y - this.layerHeight * 0.5;
        const polarRadius: number = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
        const polarAngle: number = Math.atan(normalizedY / normalizedX);
        const isInOuterRing: boolean = polarAngle >= this.gaugeAngleRange.from && polarAngle <= this.gaugeAngleRange.to && polarRadius < this.gaugeDimensions.outerRadius;
        console.log(isInOuterRing);
        return isInOuterRing;

    }
}