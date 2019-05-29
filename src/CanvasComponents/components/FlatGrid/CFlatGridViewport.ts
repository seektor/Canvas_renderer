import { Observable, Subject } from 'rxjs';
import ThemingService from '../../../app/services/themingService/ThemingService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { TDimensions } from '../../../CanvasRenderer/structures/TDimensions';
import { TLayerRenderParams } from '../../../CanvasRenderer/structures/TLayerRenderParams';
import { TRange } from '../../../CanvasRenderer/structures/TRange';
import { ISliderHandlers } from '../VerticalSlider/interfaces/ISliderHandlers';
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

    private readonly minimumRowBuffer: number = 60;
    private readonly headerHeight: number = 40;
    private readonly rowHeight: number = 25;
    private readonly verticalScrollBarWidth: number = 20;

    private verticalSliderHandlers: ISliderHandlers;
    private verticalSliderVisible: boolean;
    private viewportDimensions: TDimensions;
    private verticalSliderRatio: number;

    protected model: CFlatGridModel;
    protected canvasPainter: CFlatGridPainter;

    constructor(model: CFlatGridModel) {
        super(model);
        this.canvasPainter = new CFlatGridPainter(ThemingService.getTheme(), this.rowHeight);
        ThemingService.onThemeDidChange$.subscribe(() => this.onThemeDidChange());
        this.verticalSliderRatio = 0;
        this.columnResizeDidStart$ = new Subject();
        this.onColumnResizeDidStart$ = this.columnResizeDidStart$.asObservable();
        this.columnResizeDidEnd$ = new Subject();
        this.onColumnResizeDidEnd$ = this.columnResizeDidEnd$.asObservable();
        this.dataTopDidChange$ = new Subject();
        this.onDataTopDidChange$ = this.dataTopDidChange$.asObservable();
        this.setEvents();
    }

    private onThemeDidChange(): void {
        this.canvasPainter.applyTheme(ThemingService.getTheme());
        this.forceRerender();
    }

    private setEvents(): void {
        this.model.onMetadataDidChange$.subscribe(() => {
            this.verticalSliderHandlers.setScrollWrapperScrollSize(this.getTotalRowsHeight());
        });
        this.model.onDataDidChange$.subscribe(() => {
            this.updateDataViewport();
        });
    }

    public calculateHeaderWidth(): number {
        return this.model.getColumnsData().reduce((p, c) => p += c.width, 0);
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

    public getCanvasPainter(): CFlatGridPainter {
        return this.canvasPainter;
    }

    public getRowBufferHeight(): number {
        return this.getRowBufferCount() * this.rowHeight;
    }

    private getRowBufferCount(): number {
        const displayRowsBuffer: number = this.getNumberOfRowsPerDisplay() * 2;
        const calculatedRowsBuffer: number = Math.max(displayRowsBuffer, this.minimumRowBuffer);
        return Math.min(calculatedRowsBuffer, this.model.getRowCount());
    }

    public setVerticalSliderHandlers(handlers: ISliderHandlers): void {
        this.verticalSliderHandlers = handlers;
        handlers.onSelectedRatioDidChange$.subscribe((ratio) => this.onVertialSliderSelectedRatioDidChange(ratio));
    }

    private createDataRequestRange(firstVisibleRowNumber: number, lastVisibleRowNumber: number): TRange {
        const rowBuffer: number = this.getRowBufferCount();
        const visibleRowsCount: number = lastVisibleRowNumber - firstVisibleRowNumber;
        const rowBufferPerSide: number = Math.ceil(rowBuffer / 2);
        let from: number = Math.max(0, firstVisibleRowNumber - rowBufferPerSide);
        const fromDiff: number = rowBufferPerSide - (firstVisibleRowNumber - from);
        const calculatedTo: number = Math.max(from + visibleRowsCount + rowBufferPerSide + fromDiff, rowBuffer);
        let to: number = Math.min(this.model.getRowCount(), calculatedTo);
        const toDiff: number = Math.abs(rowBuffer - Math.abs(to - from));
        from = Math.max(0, from - toDiff);
        return { from, to };
    }

    protected onBeforeMainStageCreation(): void {
        const layerRect: TLayerRenderParams = this.layerRenderRectExtractor(undefined);
        this.viewportDimensions = { height: layerRect.height, width: layerRect.width };
    }

    protected onViewportDidInitialized(): void {
        const isVerticalScrollbarVisible: boolean = this.isVerticalScrollbarVisible();
        this.verticalSliderVisible = isVerticalScrollbarVisible;
        this.verticalSliderHandlers.setVisibility(isVerticalScrollbarVisible);
        this.verticalSliderHandlers.setScrollWrapperScrollSize(this.getTotalRowsHeight());
        this.verticalSliderHandlers.setScrollWrapperDisplaySize(this.getDataLayerRenderHeight(), true);
    }

    public onBeforeMainStageResize(): void {
        const layerRect: TLayerRenderParams = this.layerRenderRectExtractor(undefined);
        this.viewportDimensions = { height: layerRect.height, width: layerRect.width };
        const dataRequestRange: TRange = this.createDataRequestRange(0, this.getNumberOfRowsPerDisplay());
        this.model.requestData(dataRequestRange.from, dataRequestRange.to);

        this.verticalSliderHandlers.setScrollWrapperDisplaySize(this.getDataLayerRenderHeight(), false);
        const isVerticalScrollbarVisible: boolean = this.isVerticalScrollbarVisible();
        if (this.verticalSliderVisible !== isVerticalScrollbarVisible) {
            this.verticalSliderVisible = isVerticalScrollbarVisible;
            this.verticalSliderHandlers.setVisibility(isVerticalScrollbarVisible);
        }
    }

    public isVerticalScrollbarVisible(): boolean {
        const totalRowsHeight: number = this.getTotalRowsHeight();
        const dataLayerRenderHeight: number = this.getDataLayerRenderHeight();
        return totalRowsHeight > dataLayerRenderHeight;
    }

    public getDataLayerRenderHeight(): number {
        return this.viewportDimensions.height - this.headerHeight;
    }

    public getHeaderHeight(): number {
        return this.headerHeight;
    }

    private getNumberOfRowsPerDisplay(): number {
        return Math.ceil(this.getDataLayerRenderHeight() / this.rowHeight);
    }

    private onVertialSliderSelectedRatioDidChange(ratio: number): void {
        this.verticalSliderRatio = ratio;
        this.updateDataViewport();
    }

    public updateDataViewport(): void {
        const dataLayerRenderHeight: number = this.getDataLayerRenderHeight();
        const numberOfRowsPerDisplay: number = this.getNumberOfRowsPerDisplay();
        const scrollableHeight: number = Math.max(this.getTotalRowsHeight() - dataLayerRenderHeight, 0);
        const firstVisiblePartialRow: number = scrollableHeight * this.verticalSliderRatio / this.rowHeight;
        const firstVisibleWholeRow: number = Math.floor(firstVisiblePartialRow);
        const lastVisibleRow: number = firstVisibleWholeRow + numberOfRowsPerDisplay;
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