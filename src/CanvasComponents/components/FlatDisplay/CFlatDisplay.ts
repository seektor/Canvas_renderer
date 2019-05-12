import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { ViewportCtor } from '../../../CanvasRenderer/interfaces/ViewportCtor';
import { CFlatDisplayModel } from './CFlatDisplayModel';
import { CFlatDisplayViewport } from './CFlatDisplayViewport';

export class CFlatDisplay extends AbstractCanvasComponent {

    protected model: CFlatDisplayModel;
    protected viewport: CFlatDisplayViewport;

    constructor() {
        const viewportCtor: ViewportCtor<CFlatDisplayViewport, CFlatDisplayModel> = (params) => new CFlatDisplayViewport(params);
        super(viewportCtor);
        this.model = new CFlatDisplayModel();
    }

}