import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { CFlatDisplayPainter } from './styles/CFlatDisplayPainter';

export class CFlatDisplayModel extends AbstractCanvasModel {

    protected canvasPainter: CFlatDisplayPainter;

    constructor() {
        super();
    }

    public getCanvasPainter(): CFlatDisplayPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CFlatDisplayPainter();
        }
        return this.canvasPainter;
    }
}