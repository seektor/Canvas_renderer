import { Observable, Subject } from 'rxjs';
import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { CVerticalSliderPainter } from './styles/CVerticalSliderPainter';

export class CVerticalSliderModel extends AbstractCanvasModel {

    protected canvasPainter: CVerticalSliderPainter;

    public onSelectedRatioDidChange$: Observable<number>;
    private ratioDidChange$: Subject<number>;
    public onDimensionsDidChange$: Observable<void>;
    private dimensionsDidChange$: Subject<void>;

    private value: number;
    private maxValue: number;
    private selectedRatio: number;
    private scrollWrapperScrollSize: number;
    private scrollWrapperDisplaySize: number;

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.selectedRatio = 0;
        this.scrollWrapperScrollSize = 0;
        this.scrollWrapperDisplaySize = 0;
        this.value = 50;
        this.maxValue = 500;
        this.dimensionsDidChange$ = new Subject();
        this.onDimensionsDidChange$ = this.dimensionsDidChange$.asObservable();
        this.ratioDidChange$ = new Subject();
        this.onSelectedRatioDidChange$ = this.ratioDidChange$.asObservable();
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

    public setSelectedRatio(ratio: number): void {
        this.selectedRatio = ratio;
        this.ratioDidChange$.next(ratio);
    }

    public getRatio(): number {
        return this.value / this.maxValue;
    }

    public onSliderDecrease(): void {

    }

}