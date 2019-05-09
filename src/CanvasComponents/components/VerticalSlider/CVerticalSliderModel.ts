import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { CVerticalSliderPainter } from './styles/CVerticalSliderPainter';
import VerticalSliderStyles from './styles/VerticalSliderStyles';

export class CVerticalSliderModel extends AbstractCanvasModel {

    protected canvasPainter: CVerticalSliderPainter;

    private value: number;
    private maxValue: number;

    constructor() {
        super();
        this.value = 50;
        this.maxValue = 500;
    }

    public getCanvasPainter(): CVerticalSliderPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CVerticalSliderPainter(VerticalSliderStyles);
        }
        return this.canvasPainter;
    }

    public getRatio(): number {
        return this.value / this.maxValue;
    }

    public onSliderDecrease(): void {

    }

}