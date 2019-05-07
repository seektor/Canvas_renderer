import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { CanvasBasePainter } from '../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { CVerticalSliderPainter } from './styles/CVerticalSliderPainter';
import VerticalSliderStyles from './styles/VerticalSliderStyles';
import { TVerticalSliderViewState } from './structures/TVerticalSliderViewState';
import { TDimensions } from '../../../CanvasRenderer/structures/TDimensions';
import { TLayerRect } from '../../../CanvasRenderer/structures/TLayerRect';

export class CVerticalSliderModel extends AbstractCanvasModel {

    protected canvasPainter: CVerticalSliderPainter;

    constructor() {
        super();
    }

    public getCanvasPainter(): CVerticalSliderPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CVerticalSliderPainter(VerticalSliderStyles);
        }
        return this.canvasPainter;
    }

}