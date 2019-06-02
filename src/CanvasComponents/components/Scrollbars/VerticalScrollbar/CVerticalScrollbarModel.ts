import { Observable, Subject } from 'rxjs';
import { AbstractCanvasModel } from '../../../../CanvasRenderer/AbstractCanvasModel';
import { CVerticalScrollbarPainter } from './styles/CVerticalScrollbarPainter';

export class CVerticalScrollbarModel extends AbstractCanvasModel {

    protected canvasPainter: CVerticalScrollbarPainter;

    public onScrollbarRatioExternalChange$: Observable<number>;
    private scrollbarRatioExternalChange$: Subject<number>;
    public onScrollbarRatioDidChange$: Observable<number>;
    private scrollbarRatioDidChange$: Subject<number>;
    public onScrollDimensionsDidChange$: Observable<void>;
    private scrollDimensionsDidChange$: Subject<void>;

    private scrollbarRatio: number;
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
        this.scrollbarRatio = 0;
        this.scrollWrapperScrollSize = 0;
        this.scrollWrapperDisplaySize = 0;
        this.theoreticalHandleSize = 0;
        this.displayHandleSize = 0;
        this.scrollDimensionsDidChange$ = new Subject();
        this.onScrollDimensionsDidChange$ = this.scrollDimensionsDidChange$.asObservable();
        this.scrollbarRatioDidChange$ = new Subject();
        this.onScrollbarRatioDidChange$ = this.scrollbarRatioDidChange$.asObservable();
        this.scrollbarRatioExternalChange$ = new Subject();
        this.onScrollbarRatioExternalChange$ = this.scrollbarRatioExternalChange$.asObservable();
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
        this.updateHandleSizes();
        this.scrollDimensionsDidChange$.next();
    }

    public setScrollWrapperDisplaySize(size: number): void {
        this.scrollWrapperDisplaySize = size;
        this.updateHandleSizes();
        this.scrollDimensionsDidChange$.next();
    }

    public setScrollbarRatio(ratio: number): void {
        this.scrollbarRatio = ratio;
        this.scrollbarRatioDidChange$.next(ratio);
    }

    public getScrollbarRatio(): number {
        return this.scrollbarRatio;
    }

    public onScrollbarIncreaseButton(): void {
        const ratioDelta: number = this.scrollWrapperDisplaySize / (this.scrollWrapperScrollSize - this.scrollWrapperDisplaySize);
        const newRatio: number = Math.min(this.scrollbarRatio + ratioDelta, 1);
        this.scrollbarRatioExternalChange$.next(newRatio);
        this.setScrollbarRatio(newRatio);
    }

    public onScrollbarDecreaseButton(): void {
        const ratioDelta: number = this.scrollWrapperDisplaySize / (this.scrollWrapperScrollSize - this.scrollWrapperDisplaySize);
        const newRatio: number = Math.max(this.scrollbarRatio - ratioDelta, 0);
        this.scrollbarRatioExternalChange$.next(newRatio);
        this.setScrollbarRatio(newRatio);
    }

}