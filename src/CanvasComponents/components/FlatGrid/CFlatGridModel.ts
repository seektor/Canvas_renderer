import { Observable, Subject } from 'rxjs';
import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { TableMetadata } from '../../../Database/Redux/JarvisDb/types/DataTypes';
import { IHostGridModel } from './interfaces/IHostGridModel';
import { TColumnData } from './structures/TColumnData';
import { TDataFrame } from './structures/TDataFrame';

export class CFlatGridModel extends AbstractCanvasModel {

    public readonly onMetadataDidChange$: Observable<void>;
    private metadataDidChange$: Subject<void>;
    public readonly onDataDidChange$: Observable<void>;
    private dataDidChange$: Subject<void>;
    public readonly onColumnWidthDidChange$: Observable<void>;
    public columnWidthDidChange$: Subject<void>;
    // public readonly onDataDidTranslatedVertically$: Observable<void>;
    // private dataDidTranslatedVertically$: Subject<void>;

    private readonly baseColumnWidth: number = 250;
    private readonly minColumnWidth: number = 100;

    private columnsData: TColumnData[];
    private rowCount: number;
    private dataFrame: TDataFrame;
    private host: IHostGridModel;

    constructor(host: IHostGridModel) {
        super();
        this.host = host;
        this.metadataDidChange$ = new Subject();
        this.onMetadataDidChange$ = this.metadataDidChange$.asObservable();
        this.dataDidChange$ = new Subject();
        this.onDataDidChange$ = this.dataDidChange$.asObservable();
        this.columnWidthDidChange$ = new Subject();
        this.onColumnWidthDidChange$ = this.columnWidthDidChange$.asObservable();
        this.init();
        this.requestMetadata();
    }

    private init(): void {
        this.columnsData = [];
        this.rowCount = 0;
        this.dataFrame = { from: 0, to: 0, rows: [] };
    }

    public getColumnsData(): TColumnData[] {
        return this.columnsData;
    }

    public getData(): TDataFrame {
        return this.dataFrame;
    }

    public getRowCount(): number {
        return this.rowCount;
    }

    public requestData(from: number, to: number): void {
        const cb: (data: TDataFrame) => void = (data) => this.setData(data);
        this.host.requestData(from, to, cb);
    }

    private requestMetadata(): void {
        this.host.requestMetadata((metadata) => {
            this.setMetadata(metadata);
            this.forceRender$.next();
        });
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
        this.forceRender$.next();
    }

    private setData(data: TDataFrame): void {
        this.dataFrame = data;
        this.dataDidChange$.next();
        this.forceRender$.next();
    }

    public setColumnWidth(columnIndex: number, width: number): void {
        const column: TColumnData = this.columnsData[columnIndex];
        column.width = Math.max(this.minColumnWidth, width);
        this.columnWidthDidChange$.next();
    }

    // private onVertialSliderSelectedRatioDidChange(ratio: number): void {
    //     this.verticalSliderRatio = ratio;
    //     const rowHeight: number = this.canvasPainter.getRowHeight();
    //     const dataLayerDisplayHeight: number = this.canvasPainter.getDataLayerDisplayHeight();
    //     const numberOfRowsPerDisplay: number = this.getNumberOfRowsPerDisplay();
    //     const scrollableHeight: number = Math.max(this.getTotalRowsHeight() - dataLayerDisplayHeight, 0);
    //     const firstVisiblePartialRow: number = scrollableHeight * ratio / rowHeight;
    //     const firstVisibleFullRow: number = Math.floor(firstVisiblePartialRow);
    //     const lastVisibleRow: number = firstVisibleFullRow + numberOfRowsPerDisplay;

    //     const isOutOfDataRange: boolean = firstVisibleFullRow < this.dataFrame.from || lastVisibleRow > this.dataFrame.to;
    //     if (isOutOfDataRange) {
    //         const requestDataRange: TRange = this.createDataRequestRange(firstVisibleFullRow, lastVisibleRow);
    //         this.requestData(requestDataRange.from, requestDataRange.to);
    //     }
    // }

    // public getScrollTop(): number {
    //     return 0;
    //     // return scrollableHeight * this.verticalSliderRatio;
    // }
}