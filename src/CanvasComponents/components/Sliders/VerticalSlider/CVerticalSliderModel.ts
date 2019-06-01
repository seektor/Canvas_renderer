import { Observable, Subject } from 'rxjs';
import { AbstractCanvasModel } from '../../../../CanvasRenderer/AbstractCanvasModel';
import { CVerticalSliderPainter } from './styles/CVerticalSliderPainter';

export class CVerticalSliderModel extends AbstractCanvasModel {

    protected canvasPainter: CVerticalSliderPainter;

    public onSliderRatioExternalChange$: Observable<number>;
    private sliderRatioExternalChange$: Subject<number>;
    public onSliderRatioDidChange$: Observable<number>;
    private sliderRatioDidChange$: Subject<number>;
    public onDimensionsDidChange$: Observable<void>;
    private dimensionsDidChange$: Subject<void>;

    private sliderRatio: number;
    private scrollWrapperScrollSize: number;
    private scrollWrapperDisplaySize: number;

    private readonly minHandleHeight: number = 40;
    private theoreticalHandleSize: number;
    private displayHandleSize: number;

    constructor() {
        super();
        this.init();
    }

    private init(): void {
        this.sliderRatio = 0;
        this.scrollWrapperScrollSize = 0;
        this.scrollWrapperDisplaySize = 0;
        this.theoreticalHandleSize = 0;
        this.displayHandleSize = 0;
        this.dimensionsDidChange$ = new Subject();
        this.onDimensionsDidChange$ = this.dimensionsDidChange$.asObservable();
        this.sliderRatioDidChange$ = new Subject();
        this.onSliderRatioDidChange$ = this.sliderRatioDidChange$.asObservable();
        this.sliderRatioExternalChange$ = new Subject();
        this.onSliderRatioExternalChange$ = this.sliderRatioExternalChange$.asObservable();
    }

    public updateHandleSizes(): void {
        this.theoreticalHandleSize = this.scrollWrapperDisplaySize / Math.max(this.scrollWrapperScrollSize, 1) * this.scrollWrapperDisplaySize;
        this.displayHandleSize = Math.max(this.theoreticalHandleSize, this.minHandleHeight);
    }

    public getDisplayHandleHeight(): number {
        return this.displayHandleSize;
    }

    public setScrollWrapperScrollSize(size: number): void {
        this.scrollWrapperScrollSize = size;
        this.dimensionsDidChange$.next();
    }

    public setScrollWrapperDisplaySize(size: number, notifyChange: boolean): void {
        this.scrollWrapperDisplaySize = size;
        if (notifyChange) {
            this.dimensionsDidChange$.next();
        }
    }

    public setSliderRatio(ratio: number): void {
        this.sliderRatio = ratio;
        this.sliderRatioDidChange$.next(ratio);
    }

    public getSliderRatio(): number {
        return this.sliderRatio;
    }

    public onSliderButtonIncrease(): void {
        const ratioDelta: number = this.scrollWrapperDisplaySize / (this.scrollWrapperScrollSize - this.scrollWrapperDisplaySize);
        const newRatio: number = Math.min(this.sliderRatio + ratioDelta, 1);
        this.sliderRatioExternalChange$.next(newRatio);
        this.setSliderRatio(newRatio);
    }

    public onSliderButtonDecrease(): void {
        const ratioDelta: number = this.scrollWrapperDisplaySize / (this.scrollWrapperScrollSize - this.scrollWrapperDisplaySize);
        const newRatio: number = Math.max(this.sliderRatio - ratioDelta, 0);
        this.sliderRatioExternalChange$.next(newRatio);
        this.setSliderRatio(newRatio);
    }

}