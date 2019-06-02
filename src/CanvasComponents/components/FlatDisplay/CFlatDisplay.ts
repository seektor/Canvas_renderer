import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { CFlatDisplayModel } from './CFlatDisplayModel';
import { CFlatDisplayViewport } from './CFlatDisplayViewport';

export class CFlatDisplay extends AbstractCanvasComponent {

    protected model: CFlatDisplayModel;
    protected viewport: CFlatDisplayViewport;

    constructor() {
        super();
        this.model = new CFlatDisplayModel();
        this.viewport = new CFlatDisplayViewport(this.model);
    }

}