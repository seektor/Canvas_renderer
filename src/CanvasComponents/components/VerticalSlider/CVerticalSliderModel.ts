import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { ISliderHandlers } from './interfaces/ISliderHandlers';
import { CVerticalSliderPainter } from './styles/CVerticalSliderPainter';

export class CVerticalSliderModel extends AbstractCanvasModel implements ISliderHandlers {

    protected canvasPainter: CVerticalSliderPainter;

    private value: number;
    private maxValue: number;
    private scrollWrapperScrollSize: number;
    private scrollWrapperDisplaySize: number;

    constructor() {
        super();
        this.scrollWrapperScrollSize = 0;
        this.scrollWrapperDisplaySize = 0;
        this.value = 50;
        this.maxValue = 500;
    }

    public getCanvasPainter(): CVerticalSliderPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CVerticalSliderPainter();
        }
        return this.canvasPainter;
    }

    public getTheoreticalHandleHeight(): number {
        return this.scrollWrapperDisplaySize / Math.max(this.scrollWrapperScrollSize, 1) * this.scrollWrapperDisplaySize;
    }

    public setScrollWrapperScrollSize(size: number): void {
        this.scrollWrapperScrollSize = size;
    }

    public setScrollWrapperDisplaySize(size: number): void {
        this.scrollWrapperDisplaySize = size;
    }

    public init(scrollWrapperScrollSize: number, scrollWrapperDisplaySize: number): void {
        this.scrollWrapperScrollSize = scrollWrapperScrollSize;
        this.scrollWrapperDisplaySize = scrollWrapperDisplaySize;
    }

    public getRatio(): number {
        return this.value / this.maxValue;
    }

    public onSliderDecrease(): void {

    }

}