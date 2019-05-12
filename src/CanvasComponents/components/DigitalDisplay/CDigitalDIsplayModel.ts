import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { CDigitalDisplayPainter } from './styles/CDigitalDisplayPainter';

export class CDigitalDisplayModel extends AbstractCanvasModel {

    protected canvasPainter: CDigitalDisplayPainter;

    constructor() {
        super();
    }

    public getCanvasPainter(): CDigitalDisplayPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CDigitalDisplayPainter();
        }
        return this.canvasPainter;
    }
}