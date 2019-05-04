import { CFlatGridModel } from './CFlatGridModel';
import { CFlatGridViewport } from './CFlatGridViewport';
import { AbstractCanvasComponent } from '../../CanvasRenderer/AbstractCanvasComponent';
import { ViewportCtor } from '../../CanvasRenderer/interfaces/ViewportCtor';

export class CFlatGrid extends AbstractCanvasComponent {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;

    constructor() {
        const viewportCtor: ViewportCtor<CFlatGridViewport> = (params) => new CFlatGridViewport(params);
        super(viewportCtor);
        this.model = new CFlatGridModel();
    }
}