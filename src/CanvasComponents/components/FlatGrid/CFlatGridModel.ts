import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { CFlatGridPainter } from './styles/CFLatGridPainter';

export class CFlatGridModel extends AbstractCanvasModel {

    protected canvasPainter: CFlatGridPainter;

    public getCanvasPainter(): CFlatGridPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CFlatGridPainter();
        }
        return this.canvasPainter;
    }
}