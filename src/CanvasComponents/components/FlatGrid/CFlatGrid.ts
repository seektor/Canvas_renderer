import { CFlatGridModel } from './CFlatGridModel';
import { CFlatGridViewport } from './CFlatGridViewport';
import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { ViewportCtor } from '../../../CanvasRenderer/interfaces/ViewportCtor';
import CommunicationService from '../../../app/services/communicationService/CommunicationService';
import { TFlatGridParams } from './structures/TFlatGridParams';

export class CFlatGrid extends AbstractCanvasComponent {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;

    private tableName: string;

    constructor(params: TFlatGridParams) {
        const viewportCtor: ViewportCtor<CFlatGridViewport, CFlatGridModel> = (params) => new CFlatGridViewport(params);
        super(viewportCtor);
        this.tableName = params.tableName;
        this.model = new CFlatGridModel();
        this.initData();
    }

    private initData() {
        this.model.setMetadata(CommunicationService.getTableMetadata(this.tableName));
    }
}