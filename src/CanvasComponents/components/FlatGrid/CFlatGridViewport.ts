import { Observable, Subject } from 'rxjs';
import ThemingService from '../../../app/services/themingService/ThemingService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { TDimensions } from '../../../CanvasRenderer/structures/TDimensions';
import { TLayerRenderParams } from '../../../CanvasRenderer/structures/TLayerRenderParams';
import { TRange } from '../../../CanvasRenderer/structures/TRange';
import { IScrollbarHandlers } from '../Scrollbars/interfaces/IScrollbarHandlers';
import { CFlatGridModel } from './CFlatGridModel';
import { CFlatGridMainStage } from './stages/CFlatGridMainStage';
import { TDataFrame } from './structures/TDataFrame';
import { CFlatGridPainter } from './styles/CFLatGridPainter';

export class CFlatGridViewport extends AbstractCanvasViewport implements ILayerHost {

    public readonly onColumnResizeDidStart$: Observable<string>;
    public readonly columnResizeDidStart$: Subject<string>;
    public readonly onColumnResizeDidEnd$: Observable<string>;
    public readonly columnResizeDidEnd$: Subject<string>;
    public readonly onDataTopDidChange$: Observable<number>;
    private readonly dataTopDidChange$: Subject<number>;
    public readonly onDataLeftDidChange$: Observable<number>;
    private readonly dataLeftDidChange$: Subject<number>;

    private readonly minimumRowBuffer: number = 60;
    private readonly headerHeight: number = 40;
    private readonly rowHeight: number = 25;
    private readonly verticalScrollBarWidth: number = 20;
    private readonly horizontalScrollbarHeight: number = 20;

    private verticalScrollbarHandlers: IScrollbarHandlers;
    private verticalScrollbarVisible: boolean;
    private verticalScrollbarRatio: number;

    private horizontalScrollbarHandlers: IScrollbarHandlers;
    private horizontalScrollbarVisible: boolean;
    private horizontalScrollbarRatio: number;

    private viewportDimensions: TDimensions;
    private totalHeaderWidth: number;

    protected model: CFlatGridModel;
    protected canvasPainter: CFlatGridPainter;

    constructor(model: CFlatGridModel) {
        super(model);
        this.canvasPainter = new CFlatGridPainter(ThemingService.getTheme(), this.rowHeight);
        ThemingService.onThemeDidChange$.subscribe(() => this.onThemeDidChange());
        this.verticalScrollbarRatio = 0;
        this.horizontalScrollbarRatio = 0;
        this.totalHeaderWidth = 0;
        this.columnResizeDidStart$ = new Subject();
        this.onColumnResizeDidStart$ = this.columnResizeDidStart$.asObservable();
        this.columnResizeDidEnd$ = new Subject();
        this.onColumnResizeDidEnd$ = this.columnResizeDidEnd$.asObservable();
        this.dataTopDidChange$ = new Subject();
        this.onDataTopDidChange$ = this.dataTopDidChange$.asObservable();
        this.dataLeftDidChange$ = new Subject();
        this.onDataLeftDidChange$ = this.dataLeftDidChange$.asObservable();
        this.setEvents();
    }

    private onThemeDidChange(): void {
        this.canvasPainter.applyTheme(ThemingService.getTheme());
        this.forceRerender();
    }

    private setEvents(): void {
        this.model.onMetadataDidChange$.subscribe(() => {
            this.updateTotalHeaderWidth();
            this.verticalScrollbarHandlers.setScrollWrapperScrollSize(this.getTotalRowsHeight());
            this.horizontalScrollbarHandlers.setScrollWrapperScrollSize(this.totalHeaderWidth);
        });
        this.model.onDataDidChange$.subscribe(() => {
            this.updateDataViewportVertically();
        });
        this.onColumnResizeDidEnd$.subscribe(() => {
            this.updateTotalHeaderWidth();
        });
    }

    private updateTotalHeaderWidth(): void {
        this.totalHeaderWidth = this.model.getColumnsData().reduce((p, c) => p += c.width, 0);
    }

    public getTotalHeaderWidth(): number {
        return this.totalHeaderWidth;
    }

    protected createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): CFlatGridMainStage {
        return new CFlatGridMainStage({ viewport: this, model: this.model, layerHost, layerParamsExtractor });
    }

    public getTotalRowsHeight(): number {
        return this.model.getRowCount() * this.rowHeight;
    }

    public getVerticalScrollbarWidth(): number {
        return this.verticalScrollBarWidth;
    }

    public getHorizontalScrollbarHeight(): number {
        return this.horizontalScrollbarHeight;
    }

    public getCanvasPainter(): CFlatGridPainter {
        return this.canvasPainter;
    }

    public getRowBufferHeight(): number {
        return this.getRowBufferCount() * this.rowHeight;
    }

    private getRowBufferCount(): number {
        const displayRowsBuffer: number = this.getNumberOfRowsPerDisplay() * 3;
        const calculatedRowsBuffer: number = Math.max(displayRowsBuffer, this.minimumRowBuffer);
        return Math.min(calculatedRowsBuffer, this.model.getRowCount());
    }

    public setVerticalScrollbarHandlers(handlers: IScrollbarHandlers): void {
        this.verticalScrollbarHandlers = handlers;
        handlers.onScrollbarRatioDidChange$.subscribe((ratio) => this.onVertialScrollbarRatioDidChange(ratio));
    }

    public setHorizontalScrollbarHandlers(handlers: IScrollbarHandlers): void {
        this.horizontalScrollbarHandlers = handlers;
        handlers.onScrollbarRatioDidChange$.subscribe((ratio) => this.onHorizontalScrollbarRatioDidChange(ratio));
    }

    private createDataRequestRange(firstVisibleRowNumber: number, lastVisibleRowNumber: number): TRange {
        const rowBuffer: number = this.getRowBufferCount();
        const visibleRowsCount: number = lastVisibleRowNumber - firstVisibleRowNumber;
        const rowBufferPerSide: number = Math.ceil((rowBuffer - visibleRowsCount) * 0.5);
        const calculatedFrom: number = Math.max(0, firstVisibleRowNumber - rowBufferPerSide);
        const calculatedFromDiff: number = rowBufferPerSide - (firstVisibleRowNumber - calculatedFrom);
        const calculatedTo: number = Math.max(lastVisibleRowNumber + rowBufferPerSide + calculatedFromDiff, rowBuffer);
        const to: number = Math.min(this.model.getRowCount(), calculatedTo);
        const calculatedToDiff: number = Math.abs(rowBuffer - Math.abs(to - calculatedFrom));
        const from = Math.max(0, calculatedFrom - calculatedToDiff);
        return { from, to };
    }

    protected onBeforeMainStageCreation(): void {
        const layerRect: TLayerRenderParams = this.layerRenderRectExtractor(undefined);
        this.viewportDimensions = { height: layerRect.height, width: layerRect.width };
    }

    protected onViewportDidInitialize(): void {
        let isVerticalScrollbarVisible: boolean = this.shouldVerticalScrollbarBeVisible(true);
        let isHorizontalScrollbarVisible: boolean = this.shouldHorizontalScrollbarBeVisible(true);
        if (!isVerticalScrollbarVisible) {
            isHorizontalScrollbarVisible = this.shouldHorizontalScrollbarBeVisible(false);
        }
        if (!isHorizontalScrollbarVisible) {
            isVerticalScrollbarVisible = this.shouldVerticalScrollbarBeVisible(false);
        }

        this.verticalScrollbarVisible = isVerticalScrollbarVisible;
        this.verticalScrollbarHandlers.setVisibility(isVerticalScrollbarVisible);
        this.verticalScrollbarHandlers.setScrollWrapperScrollSize(this.getTotalRowsHeight());
        this.verticalScrollbarHandlers.setScrollWrapperDisplaySize(this.getDataLayerRenderHeight(isHorizontalScrollbarVisible), true);

        this.horizontalScrollbarVisible = isHorizontalScrollbarVisible;
        this.horizontalScrollbarHandlers.setVisibility(isHorizontalScrollbarVisible);
        this.horizontalScrollbarHandlers.setScrollWrapperScrollSize(this.totalHeaderWidth);
        this.horizontalScrollbarHandlers.setScrollWrapperDisplaySize(this.getDataLayerRenderWidth(isVerticalScrollbarVisible), true);
    }

    public onBeforeMainStageResize(): void {
        const layerRect: TLayerRenderParams = this.layerRenderRectExtractor(undefined);
        this.viewportDimensions = { height: layerRect.height, width: layerRect.width };
        const dataRequestRange: TRange = this.createDataRequestRange(0, this.getNumberOfRowsPerDisplay());
        this.model.requestData(dataRequestRange.from, dataRequestRange.to);

        let isVerticalScrollbarVisible: boolean = this.shouldVerticalScrollbarBeVisible(true);
        let isHorizontalScrollbarVisible: boolean = this.shouldHorizontalScrollbarBeVisible(true);
        if (!isVerticalScrollbarVisible) {
            isHorizontalScrollbarVisible = this.shouldHorizontalScrollbarBeVisible(false);
        }
        if (!isHorizontalScrollbarVisible) {
            isVerticalScrollbarVisible = this.shouldVerticalScrollbarBeVisible(false);
        }

        this.verticalScrollbarHandlers.setScrollWrapperDisplaySize(this.getDataLayerRenderHeight(isHorizontalScrollbarVisible), false);
        if (this.verticalScrollbarVisible !== isVerticalScrollbarVisible) {
            this.verticalScrollbarVisible = isVerticalScrollbarVisible;
            this.verticalScrollbarHandlers.setVisibility(isVerticalScrollbarVisible);
        }

        this.horizontalScrollbarHandlers.setScrollWrapperDisplaySize(this.getDataLayerRenderWidth(isVerticalScrollbarVisible), false);
        if (this.horizontalScrollbarVisible !== isHorizontalScrollbarVisible) {
            this.horizontalScrollbarVisible = isHorizontalScrollbarVisible;
            this.horizontalScrollbarHandlers.setVisibility(isHorizontalScrollbarVisible);
        }
    }

    private shouldVerticalScrollbarBeVisible(isHorizontalScrollbarVisible: boolean): boolean {
        const totalRowsHeight: number = this.getTotalRowsHeight();
        const dataLayerRenderHeight: number = this.getDataLayerRenderHeight(isHorizontalScrollbarVisible);
        return totalRowsHeight > dataLayerRenderHeight;
    }

    public isVerticalScrollbarVisible(): boolean {
        return this.verticalScrollbarVisible;
    }

    public shouldHorizontalScrollbarBeVisible(isVerticalScrollbarVisible: boolean): boolean {
        const totalColumnsWidth: number = this.totalHeaderWidth;
        const dataLayerRenderHeight: number = this.getDataLayerRenderWidth(isVerticalScrollbarVisible);
        return totalColumnsWidth > dataLayerRenderHeight;
    }

    public isHorizontalScrollbarVisible(): boolean {
        return this.horizontalScrollbarVisible;
    }

    public getDataLayerRenderHeight(isHorizontalScrollbarVisible: boolean): number {
        const horizontalScrollbarDiff: number = isHorizontalScrollbarVisible ? this.horizontalScrollbarHeight : 0;
        return Math.max(this.viewportDimensions.height - this.headerHeight - horizontalScrollbarDiff, 0);
    }

    public getDataLayerRenderWidth(isVerticalScrollbarVisible: boolean): number {
        const verticalScrollbarDiff: number = isVerticalScrollbarVisible ? this.verticalScrollBarWidth : 0;
        return Math.max(this.viewportDimensions.width - verticalScrollbarDiff, 0);
    }

    public getHeaderHeight(): number {
        return this.headerHeight;
    }

    private getNumberOfRowsPerDisplay(): number {
        return Math.ceil(this.getDataLayerRenderHeight(this.horizontalScrollbarVisible) / this.rowHeight);
    }

    private onVertialScrollbarRatioDidChange(ratio: number): void {
        this.verticalScrollbarRatio = ratio;
        this.updateDataViewportVertically();
    }

    private onHorizontalScrollbarRatioDidChange(ratio: number): void {
        this.horizontalScrollbarRatio = ratio;
        this.updateDataViewportHorizontally();
    }

    public updateDataViewportHorizontally(): void {
        const dataLayerRenderWidth: number = this.getDataLayerRenderWidth(this.verticalScrollbarVisible);
        const scrollableWidth: number = Math.max(this.totalHeaderWidth - dataLayerRenderWidth, 0);
        const dataSX: number = scrollableWidth * this.horizontalScrollbarRatio;
        this.dataLeftDidChange$.next(dataSX);
    }

    public updateDataViewportVertically(): void {
        const dataLayerRenderHeight: number = this.getDataLayerRenderHeight(this.horizontalScrollbarVisible);
        const numberOfRowsPerDisplay: number = this.getNumberOfRowsPerDisplay();
        const scrollableHeight: number = Math.max(this.getTotalRowsHeight() - dataLayerRenderHeight, 0);
        const firstVisiblePartialRow: number = scrollableHeight * this.verticalScrollbarRatio / this.rowHeight;
        const firstVisibleWholeRow: number = Math.floor(firstVisiblePartialRow);
        const lastVisibleRow: number = Math.floor(firstVisiblePartialRow + numberOfRowsPerDisplay);
        const currentDataFrame: TDataFrame = this.model.getData();
        const isOutOfDataRange: boolean = firstVisibleWholeRow < currentDataFrame.from || lastVisibleRow > currentDataFrame.to;
        if (isOutOfDataRange) {
            const requestDataRange: TRange = this.createDataRequestRange(firstVisibleWholeRow, lastVisibleRow);
            this.model.requestData(requestDataRange.from, requestDataRange.to);
        } else {
            const dataSY: number = (firstVisiblePartialRow - currentDataFrame.from) * this.rowHeight;
            this.dataTopDidChange$.next(dataSY);
            this.forceRender();
        }
    }
}