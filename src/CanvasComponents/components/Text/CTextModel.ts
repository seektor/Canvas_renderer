import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { CTextPainter } from './styles/CTextPainter';

export class CTextModel extends AbstractCanvasModel {

    protected canvasPainter: CTextPainter;

    constructor() {
        super();
    }

    public getCanvasPainter(): CTextPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CTextPainter();
        }
        return this.canvasPainter;
    }
}