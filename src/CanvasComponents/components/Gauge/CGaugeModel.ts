import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { TColorRange } from '../../../CanvasRenderer/structures/TColorRange';
import { TRange } from '../../../CanvasRenderer/structures/TRange';
import { TGaugeParams } from './structures/TGaugeParams';
import { CGaugePainter } from './styles/CGaugePainter';

export class CGaugeModel extends AbstractCanvasModel {

    private gaugeRange: TRange = { from: 0, to: 100 };
    private gaugeAngleRange: TRange = { from: Math.PI * 0.75, to: Math.PI * 2.25 };
    private gaugeColorRanges: TColorRange[];
    private value: number = 88;

    protected canvasPainter: CGaugePainter;

    constructor(params: TGaugeParams) {
        super();
        this.processParams(params);
    }

    private processParams(params: TGaugeParams): void {
        this.gaugeRange = { from: params.min, to: params.max };
        this.gaugeColorRanges = params.colorPercentageRanges;
        const gaugeAngleColorRanges: TColorRange[] = this.gaugeColorRanges.map((colorRange: TColorRange) => {
            return {
                color: colorRange.color,
                from: this.getValueAsAngle(colorRange.from),
                to: this.getValueAsAngle(colorRange.to),
            }
        })
        this.canvasPainter = new CGaugePainter(this.gaugeAngleRange, gaugeAngleColorRanges);
    }

    private getValueAsAngle(value: number): number {
        return this.gaugeAngleRange.from + (this.gaugeAngleRange.to - this.gaugeAngleRange.from) * value / 100
    }

    public getCanvasPainter(): CGaugePainter {
        return this.canvasPainter;
    }

    public getCurrentDisplayValue(): string {
        return `${this.value}%`;
    }

    public getCurrentValueAsAngle(): number {
        return this.getValueAsAngle(this.value);
    }
}