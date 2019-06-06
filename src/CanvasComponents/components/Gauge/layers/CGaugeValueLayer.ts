import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CursorType } from '../../../../CanvasRenderer/structures/CursorType';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TDeltas } from '../../../../CanvasRenderer/structures/TDeltas';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TRange } from '../../../../CanvasRenderer/structures/TRange';
import { CGaugeModel } from '../CGaugeModel';
import { CGaugeViewport } from '../CGaugeViewport';
import { TGaugeDimensions } from '../structures/TGaugeDimensions';
import { CGaugePainter } from '../styles/CGaugePainter';

export class CGaugeValueLayer extends AbstractCanvasLayer {

    protected model: CGaugeModel;
    protected viewport: CGaugeViewport;
    private canvasPainter: CGaugePainter;
    private gaugeDimensions: TGaugeDimensions;
    private gaugeAngleRange: TRange;
    private isDragging: boolean;
    private normalizedActionStartCoords: TCoords | null;

    constructor(params: TLayerParams<CGaugeModel, CGaugeViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.isDragging = false;
        this.normalizedActionStartCoords = null;
        this.gaugeAngleRange = this.canvasPainter.getGaugeAngleRange();
        this.gaugeDimensions = this.canvasPainter.getGaugeDimensions();
        this.model.onValueDidChange$.subscribe(() => this.onValueDidChange());
        this.renderSelf();
        this.notifyRenderChanges();
    }

    private onValueDidChange(): void {
        this.renderSelf();
        this.notifyRenderChanges();
    }

    public onLayerDidResize(): void {
        this.gaugeDimensions = this.canvasPainter.getGaugeDimensions();
    }

    public renderSelf(): void {
        const displayValue: string = this.model.getCurrentDisplayValue();
        const angleValue: number = this.model.getCurrentValueAsAngle();
        this.canvasPainter.drawValue(this.layerContext, this.getLayerRect(), displayValue, angleValue);
    }

    public onActionEnter(): void {
        this.viewport.setCursor(CursorType.Pointer);
    }

    public onActionLeave(): void {
        if (!this.isDragging) {
            this.viewport.setCursor(CursorType.Auto);
        }
    }

    public onActionDrag(deltas: TDeltas): void {
        const normalizedX: number = this.normalizedActionStartCoords.x + deltas.dX;
        const normalizedY: number = this.normalizedActionStartCoords.y - deltas.dY;
        const polarAngle: number = Math.atan(normalizedY / normalizedX);
        const normalizedAngleRange: number = Math.PI * 2 - Math.abs(this.gaugeAngleRange.from - this.gaugeAngleRange.to);
        const normalizedAngle: number = normalizedX < 0 ? polarAngle + Math.PI + this.gaugeAngleRange.to : polarAngle + this.gaugeAngleRange.to;
        const clampedValue: number = normalizedAngleRange - Math.max(0, Math.min(normalizedAngle, normalizedAngleRange));
        const ratio: number = clampedValue / normalizedAngleRange;
        this.model.setRatio(ratio);
    }

    public onActionStart(coords: TCoords): void {
        this.normalizedActionStartCoords = {
            x: coords.x - this.layerWidth * 0.5,
            y: this.layerHeight * 0.5 - coords.y,
        }
        this.isDragging = true;
    }

    public onActionEnd(coords: TCoords): void {
        this.isDragging = false;
        if (!this.isPierced(coords)) {
            this.viewport.setCursor(CursorType.Auto);
        }
    }

    public onViewportLeave(): void {
        this.viewport.setCursor(CursorType.Auto);
    }

    public isPierced(coords: TCoords): boolean {
        const normalizedX: number = coords.x - this.layerWidth * 0.5;
        const normalizedY: number = this.layerHeight * 0.5 - coords.y;
        const polarRadius: number = Math.sqrt(normalizedX * normalizedX + normalizedY * normalizedY);
        const polarAngle: number = Math.atan(normalizedY / normalizedX);
        const normalizedAngleRange: number = Math.PI * 2 - Math.abs(this.gaugeAngleRange.from - this.gaugeAngleRange.to);
        const normalizedAngle: number = normalizedX < 0 ? polarAngle + Math.PI + this.gaugeAngleRange.to : polarAngle + this.gaugeAngleRange.to;
        const isInRing: boolean = normalizedAngle >= 0 && normalizedAngle <= normalizedAngleRange && polarRadius < this.gaugeDimensions.outerRadius && polarRadius > this.gaugeDimensions.innerRadius;
        return isInRing;

    }
}