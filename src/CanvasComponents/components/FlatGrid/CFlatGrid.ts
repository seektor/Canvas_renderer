import CommunicationService from '../../../app/services/communicationService/CommunicationService';
import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { DataRow, TableMetadata } from '../../../Database/Redux/JarvisDb/types/DataTypes';
import { CFlatGridModel } from './CFlatGridModel';
import { CFlatGridViewport } from './CFlatGridViewport';
import { TDataFrame } from './structures/TDataFrame';
import { TFlatGridParams } from './structures/TFlatGridParams';

export class CFlatGrid extends AbstractCanvasComponent {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;

    protected lastDataRequestGuid: string | null;
    private tableName: string;

    constructor(params: TFlatGridParams) {
        super();
        this.tableName = params.tableName;
        this.lastDataRequestGuid = null;
        this.model = new CFlatGridModel(this);
        this.viewport = new CFlatGridViewport(this.model)
    }

    public async requestData(from: number, to: number, cb: (data: TDataFrame) => void): Promise<void> {
        const rows: DataRow[] = CommunicationService.getTableData(this.tableName, from, to);
        const dataRequestGuid: string = this.createDataRequestGuid(from, to);
        this.lastDataRequestGuid = dataRequestGuid;
        return new Promise((res) => setTimeout(() => {
            if (this.lastDataRequestGuid === dataRequestGuid) {
                cb({ rows, from, to });
                this.lastDataRequestGuid = null;
            }
            res();
        }, 0));
    }

    private createDataRequestGuid(from: number, to: number): string {
        return `${from}_${to}`;
    }

    public async requestMetadata(cb: (metadata: TableMetadata) => void): Promise<void> {
        const tableMetadata: TableMetadata = CommunicationService.getTableMetadata(this.tableName);
        return new Promise((res) => setTimeout(() => {
            cb(tableMetadata);
            res();
        }, 50));
    }
}