import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { TRange } from '../../../CanvasRenderer/structures/TRange';
import { CGaugePainter } from './styles/CGaugePainter';

export class CGaugeModel extends AbstractCanvasModel {

    private readonly gaugeRange: TRange = { from: Math.PI * 0.75, to: Math.PI * 2.25 };

    protected canvasPainter: CGaugePainter;

    constructor() {
        super();
    }

    public getCanvasPainter(): CGaugePainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CGaugePainter();
        }
        return this.canvasPainter;
    }

    public getGaugeRange(): TRange {
        return this.gaugeRange;
    }
}