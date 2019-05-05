import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { BaseCanvasPainter } from '../../../CanvasRenderer/utils/painter/BaseCanvasPainter';

export class CVerticalSliderModel extends AbstractCanvasModel {

    protected canvasPainter: BaseCanvasPainter;

    public getCanvasPainter(): BaseCanvasPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new BaseCanvasPainter();
        }
        return this.canvasPainter;
    }

}