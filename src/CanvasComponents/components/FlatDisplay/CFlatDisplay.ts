import CommunicationService from '../../../app/services/communicationService/CommunicationService';
import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { VariableMetadata } from '../../../Database/Redux/JarvisDb/types/DataTypes';
import { CFlatDisplayModel } from './CFlatDisplayModel';
import { CFlatDisplayViewport } from './CFlatDisplayViewport';
import { IHostFlatDisplay } from './interfaces/IHostFlatDisplay';
import { TFlatDisplayParams } from './structures/TFlatDisplayParams';

export class CFlatDisplay extends AbstractCanvasComponent implements IHostFlatDisplay {

    protected model: CFlatDisplayModel;
    protected viewport: CFlatDisplayViewport;
    private variableId: string;

    constructor(params: TFlatDisplayParams) {
        super();
        this.variableId = params.variableId;
        this.model = new CFlatDisplayModel(params.viewMode, this);
        this.viewport = new CFlatDisplayViewport(this.model);
        CommunicationService.subscribe(() => this.model.refreshData$.next());
    }

    public requestVariableValue(cb: (value: number) => void): Promise<void> {
        const variableValue: number = CommunicationService.getVariableValue(this.variableId);
        return new Promise((res) => setTimeout(() => {
            cb(variableValue);
            res();
        }, 0));
    }

    public requestVariableMetadata(cb: (metadata: VariableMetadata) => void): Promise<void> {
        const variableMetadata: VariableMetadata = CommunicationService.getVariableMetadata(this.variableId);
        return new Promise((res) => setTimeout(() => {
            cb(variableMetadata);
            res();
        }, 0));
    }
}