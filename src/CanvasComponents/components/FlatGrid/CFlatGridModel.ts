import { Observable, Subject } from 'rxjs';
import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { TableMetadata } from '../../../Database/Redux/JarvisDb/types/DataTypes';
import { IHostGridModel } from './interfaces/IHostGridModel';
import { TColumnData } from './structures/TColumnData';
import { TDataFrame } from './structures/TDataFrame';
import { CFlatGridPainter } from './styles/CFLatGridPainter';

export class CFlatGridModel extends AbstractCanvasModel {

    public onMetadataDidChange$: Observable<void>;
    private metadataDidChange$: Subject<void>;
    public onDataDidChange$: Observable<void>;
    private dataDidChange$: Subject<void>;

    private readonly baseColumnWidth: number = 250;
    private readonly minColumnWidth: number = 100;
    private readonly rowHeight: number = 20;
    private readonly headerHeight: number = 40;
    private readonly rowBuffer: number = 60;

    protected canvasPainter: CFlatGridPainter;
    private columnsData: TColumnData[];
    private rowCount: number;
    private dataFrame: TDataFrame;
    private host: IHostGridModel;

    constructor(host: IHostGridModel) {
        super();
        this.host = host;
        this.init();
        this.requestMetadata();
        this.requestData();
    }

    private init(): void {
        this.columnsData = [];
        this.rowCount = 0;
        this.dataFrame = { from: 0, to: 0, rows: [] };
        this.metadataDidChange$ = new Subject();
        this.onMetadataDidChange$ = this.metadataDidChange$.asObservable();
        this.dataDidChange$ = new Subject();
        this.onDataDidChange$ = this.dataDidChange$.asObservable();
        this.canvasPainter = new CFlatGridPainter(this.rowHeight);
    }

    public getCanvasPainter(): CFlatGridPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CFlatGridPainter(this.rowHeight);
        }
        return this.canvasPainter;
    }

    public getHeaderHeight(): number {
        return this.headerHeight;
    }

    public getColumnsData(): TColumnData[] {
        return this.columnsData;
    }

    public getData(): TDataFrame {
        return this.dataFrame;
    }

    private requestData(): void {
        this.host.requestData(0, this.rowBuffer);
    }

    private requestMetadata(): void {
        this.host.requestMetadata();
    }

    public getRowBufferHeight(): number {
        return this.rowBuffer * this.rowHeight;
    }

    public setMetadata(data: TableMetadata): void {
        this.rowCount = data.rowCount;
        this.columnsData = data.fields.map(field => {
            return {
                ...field,
                width: this.baseColumnWidth
            }
        });
        this.metadataDidChange$.next();
        this.ownViewport.forceRerender();
    }

    public setData(data: TDataFrame): void {
        this.dataFrame = data;
        this.dataDidChange$.next();
        this.ownViewport.forceRerender();
    }

    public calculateHeaderWidth(): number {
        return this.columnsData.reduce((p, c) => p += c.width, 0);
    }

    public getTotalRowsHeight(): number {
        return this.rowCount * this.rowHeight;
    }

    public setColumnWidth(columnIndex: number, width: number): void {
        const column: TColumnData = this.columnsData[columnIndex];
        column.width = Math.max(this.minColumnWidth, width);
    }
}