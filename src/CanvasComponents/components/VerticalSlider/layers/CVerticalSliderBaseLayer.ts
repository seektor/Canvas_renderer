import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderViewport } from '../CVerticalSliderViewport';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';

export class CVerticalSliderBaseLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    private painter: CVerticalSliderPainter;

    constructor(params: TLayerParams<CVerticalSliderModel, CVerticalSliderViewport, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.painter.drawBackground(this.layerContext, this.getLayerRenderRect());
    }
}