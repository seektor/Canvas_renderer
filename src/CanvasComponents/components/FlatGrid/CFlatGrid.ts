import CommunicationService from '../../../app/services/communicationService/CommunicationService';
import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { ViewportCtor } from '../../../CanvasRenderer/interfaces/ViewportCtor';
import { DataRow, TableMetadata } from '../../../Database/Redux/JarvisDb/types/DataTypes';
import { CFlatGridModel } from './CFlatGridModel';
import { CFlatGridViewport } from './CFlatGridViewport';
import { TFlatGridParams } from './structures/TFlatGridParams';

export class CFlatGrid extends AbstractCanvasComponent {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;

    private tableName: string;

    constructor(params: TFlatGridParams) {
        const viewportCtor: ViewportCtor<CFlatGridViewport, CFlatGridModel> = (params) => new CFlatGridViewport(params);
        super(viewportCtor);
        this.tableName = params.tableName;
        this.model = new CFlatGridModel(this);
    }

    public async requestData(from: number, to: number): Promise<void> {
        const rows: DataRow[] = CommunicationService.getTableData(this.tableName, from, to);
        setTimeout(() => this.model.setData({ rows, from, to }), 100);
    }

    public async requestMetadata(): Promise<void> {
        const tableMetadata: TableMetadata = CommunicationService.getTableMetadata(this.tableName);
        setTimeout(() => this.model.setMetadata(tableMetadata), 100);
    }
}