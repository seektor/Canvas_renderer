import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { CLineChartPainter } from './styles/CLineChartPainter';

export class CLineChartModel extends AbstractCanvasModel {

    protected canvasPainter: CLineChartPainter;

    constructor() {
        super();
    }

    public getTemporaryRatioData(): number[] {
        return [0, 0.3, 0.24, 0.6, 0.65, 0.49, 0.65, 0.69, 0.84, 0.75, 0.93];
    }
}