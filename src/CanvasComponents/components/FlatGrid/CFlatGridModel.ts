import { Observable, Subject } from 'rxjs';
import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { TRange } from '../../../CanvasRenderer/structures/TRange';
import { TableMetadata } from '../../../Database/Redux/JarvisDb/types/DataTypes';
import { ISliderHandlers } from '../VerticalSlider/interfaces/ISliderHandlers';
import { IHostGridModel } from './interfaces/IHostGridModel';
import { TColumnData } from './structures/TColumnData';
import { TDataFrame } from './structures/TDataFrame';
import { CFlatGridPainter } from './styles/CFLatGridPainter';

export class CFlatGridModel extends AbstractCanvasModel {

    public readonly onMetadataDidChange$: Observable<void>;
    private metadataDidChange$: Subject<void>;
    public readonly onDataDidChange$: Observable<void>;
    private dataDidChange$: Subject<void>;
    public readonly onDataDidTranslatedVertically$: Observable<void>;
    private dataDidTranslatedVertically$: Subject<void>;

    private readonly baseColumnWidth: number = 250;
    private readonly minColumnWidth: number = 100;
    private readonly minimumRowBuffer: number = 60;

    protected canvasPainter: CFlatGridPainter;
    private columnsData: TColumnData[];
    private rowCount: number;
    private dataFrame: TDataFrame;
    private host: IHostGridModel;

    private verticalSliderHandlers: ISliderHandlers;
    private verticalSliderRatio: number;

    constructor(host: IHostGridModel) {
        super();
        this.host = host;
        this.metadataDidChange$ = new Subject();
        this.onMetadataDidChange$ = this.metadataDidChange$.asObservable();
        this.dataDidChange$ = new Subject();
        this.onDataDidChange$ = this.dataDidChange$.asObservable();
        this.dataDidTranslatedVertically$ = new Subject();
        this.onDataDidTranslatedVertically$ = this.dataDidTranslatedVertically$.asObservable();
        this.init();
        this.requestMetadata();
    }

    private init(): void {
        this.columnsData = [];
        this.rowCount = 0;
        this.verticalSliderRatio = 0;
        this.dataFrame = { from: 0, to: 0, rows: [] };
        this.canvasPainter = new CFlatGridPainter();
    }

    public getCanvasPainter(): CFlatGridPainter {
        return this.canvasPainter;
    }

    public getColumnsData(): TColumnData[] {
        return this.columnsData;
    }

    public getData(): TDataFrame {
        return this.dataFrame;
    }

    public setVerticalSliderHandlers(handlers: ISliderHandlers): void {
        this.verticalSliderHandlers = handlers;
        handlers.onSelectedRatioDidChange$.subscribe((ratio) => this.onVertialSliderSelectedRatioDidChange(ratio));
    }

    private requestData(from: number, to: number): void {
        const cb: (data: TDataFrame) => void = (data) => this.setData(data);
        this.host.requestData(from, to, cb);
    }

    private requestMetadata(): void {
        this.host.requestMetadata((metadata) => {
            this.setMetadata(metadata);
            this.requestData(0, this.minimumRowBuffer);
            this.forceRerender$.next();
        });
    }

    public getRowBufferHeight(): number {
        return this.getRowBuffer() * this.canvasPainter.getRowHeight();
    }

    private getRowBuffer(): number {
        const displayRowsBuffer: number = this.getNumberOfRowsPerDisplay() * 2;
        const calculatedRowsBuffer: number = Math.max(displayRowsBuffer, this.minimumRowBuffer);
        return Math.min(calculatedRowsBuffer, this.rowCount);
    }

    private setMetadata(data: TableMetadata): void {
        this.rowCount = data.rowCount;
        this.columnsData = data.fields.map(field => {
            return {
                ...field,
                width: this.baseColumnWidth
            }
        });
        this.metadataDidChange$.next();
        this.forceRerender$.next();
    }

    private setData(data: TDataFrame): void {
        this.dataFrame = data;
        this.dataDidChange$.next();
        this.dataDidTranslatedVertically$.next();
        this.forceRerender$.next();
    }

    public calculateHeaderWidth(): number {
        return this.columnsData.reduce((p, c) => p += c.width, 0);
    }

    public getTotalRowsHeight(): number {
        return this.rowCount * this.canvasPainter.getRowHeight();
    }

    public setColumnWidth(columnIndex: number, width: number): void {
        const column: TColumnData = this.columnsData[columnIndex];
        column.width = Math.max(this.minColumnWidth, width);
    }

    private onVertialSliderSelectedRatioDidChange(ratio: number): void {
        this.verticalSliderRatio = ratio;
        const rowHeight: number = this.canvasPainter.getRowHeight();
        const dataLayerDisplayHeight: number = this.canvasPainter.getDataLayerDisplayHeight();
        const numberOfRowsPerDisplay: number = this.getNumberOfRowsPerDisplay();
        const scrollableHeight: number = Math.max(this.getTotalRowsHeight() - dataLayerDisplayHeight, 0);
        const firstVisiblePartialRow: number = scrollableHeight * ratio / rowHeight;
        const firstVisibleFullRow: number = Math.floor(firstVisiblePartialRow);
        const lastVisibleRow: number = firstVisibleFullRow + numberOfRowsPerDisplay;

        const isOutOfDataRange: boolean = firstVisibleFullRow < this.dataFrame.from || lastVisibleRow > this.dataFrame.to;
        if (isOutOfDataRange) {
            const requestDataRange: TRange = this.createDataRequestRange(firstVisibleFullRow, lastVisibleRow);
            this.requestData(requestDataRange.from, requestDataRange.to);
        }
    }

    public getScrollTop(): number {
        return 0;
        // return scrollableHeight * this.verticalSliderRatio;
    }

    private createDataRequestRange(firstVisibleRowNumber: number, lastVisibleRowNumber): TRange {
        const rowBuffer: number = this.getRowBuffer();
        const visibleRowsCount: number = lastVisibleRowNumber - firstVisibleRowNumber;
        const rowBufferPerSide: number = Math.ceil(rowBuffer / 2);
        let from: number = Math.max(0, firstVisibleRowNumber - rowBufferPerSide);
        const fromDiff: number = rowBufferPerSide - (firstVisibleRowNumber - from);
        let to: number = Math.min(this.rowCount, from + visibleRowsCount + rowBufferPerSide + fromDiff);
        const diff: number = rowBuffer - (to - from);
        from = Math.max(0, from - diff);
        return { from, to };
    }

    private getNumberOfRowsPerDisplay(): number {
        return Math.ceil(this.canvasPainter.getDataLayerDisplayHeight() / this.canvasPainter.getRowHeight());
    }
}