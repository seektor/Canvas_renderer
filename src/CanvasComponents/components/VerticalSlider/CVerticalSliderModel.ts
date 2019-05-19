import { Observable, Subject } from 'rxjs';
import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { ISliderHandlers } from './interfaces/ISliderHandlers';
import { CVerticalSliderPainter } from './styles/CVerticalSliderPainter';

export class CVerticalSliderModel extends AbstractCanvasModel implements ISliderHandlers {

    protected canvasPainter: CVerticalSliderPainter;

    public onDimensionsDidChange$: Observable<void>;
    private dimensionsDidChange$: Subject<void>;

    private value: number;
    private maxValue: number;
    private scrollWrapperScrollSize: number;
    private scrollWrapperDisplaySize: number;

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.scrollWrapperScrollSize = 0;
        this.scrollWrapperDisplaySize = 0;
        this.value = 50;
        this.maxValue = 500;
        this.dimensionsDidChange$ = new Subject();
        this.onDimensionsDidChange$ = this.dimensionsDidChange$.asObservable();
    }

    public getCanvasPainter(): CVerticalSliderPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CVerticalSliderPainter();
        }
        return this.canvasPainter;
    }

    public getTheoreticalHandleHeight(): number {
        return 70; // this.scrollWrapperDisplaySize / Math.max(this.scrollWrapperScrollSize, 1) * this.scrollWrapperDisplaySize;
    }

    public setScrollWrapperScrollSize(size: number): void {
        this.scrollWrapperScrollSize = size;
    }

    public setScrollWrapperDisplaySize(size: number): void {
        this.scrollWrapperDisplaySize = size;
        this.dimensionsDidChange$.next();
    }

    public getRatio(): number {
        return this.value / this.maxValue;
    }

    public onSliderDecrease(): void {

    }

}