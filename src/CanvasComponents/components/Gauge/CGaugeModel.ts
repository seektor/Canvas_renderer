import { Observable, Subject } from 'rxjs';
import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { TColorRange } from '../../../CanvasRenderer/structures/TColorRange';
import { TRange } from '../../../CanvasRenderer/structures/TRange';
import { TGaugeParams } from './structures/TGaugeParams';
import { CGaugePainter } from './styles/CGaugePainter';

export class CGaugeModel extends AbstractCanvasModel {

    public onValueDidChange$: Observable<void>;
    private valueDidChange$: Subject<void>;

    private gaugeRange: TRange;
    private gaugeAngleRange: TRange;
    private gaugeColorRanges: TColorRange[];
    private value: number = 88;

    protected canvasPainter: CGaugePainter;

    constructor(params: TGaugeParams) {
        super();
        this.init();
        this.processParams(params);
    }

    private init(): void {
        this.gaugeRange = { from: 0, to: 100 };
        this.gaugeAngleRange = { from: Math.PI * 0.75, to: Math.PI * 0.25 };
        this.valueDidChange$ = new Subject();
        this.onValueDidChange$ = this.valueDidChange$.asObservable();
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
        return this.gaugeAngleRange.from + (Math.PI * 2 - Math.abs(this.gaugeAngleRange.from - this.gaugeAngleRange.to)) * value / 100;
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

    public setRatio(ratio: number): void {
        const rawValue: number = this.gaugeRange.from + (this.gaugeRange.to - this.gaugeRange.from) * ratio;
        this.value = +rawValue.toFixed(1);
        this.valueDidChange$.next();
    }
}