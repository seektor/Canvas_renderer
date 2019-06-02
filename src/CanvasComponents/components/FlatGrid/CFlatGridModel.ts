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
        let fakeData: TableMetadata = { baseWidths: data.baseWidths, fields: data.fields.slice(0, 3), rowCount: data.rowCount }
        this.rowCount = fakeData.rowCount;
        this.columnsData = fakeData.fields.map((field, fieldIndex) => {
            return {
                ...field,
                width: Math.max(this.minColumnWidth, fakeData.baseWidths[fieldIndex])
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
}