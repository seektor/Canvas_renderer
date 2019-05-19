import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { CLineChartPainter } from './styles/CLineChartPainter';

export class CLineChartModel extends AbstractCanvasModel {

    protected canvasPainter: CLineChartPainter;

    constructor() {
        super();
    }

    public getCanvasPainter(): CLineChartPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CLineChartPainter();
        }
        return this.canvasPainter;
    }
}