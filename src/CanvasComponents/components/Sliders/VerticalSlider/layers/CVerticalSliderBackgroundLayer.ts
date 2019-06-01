import { AbstractCanvasLayer } from '../../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderViewport } from '../CVerticalSliderViewport';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';

export class CVerticalSliderBackgroundLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    protected viewport: CVerticalSliderViewport;
    private painter: CVerticalSliderPainter;

    constructor(params: TLayerParams<CVerticalSliderModel, CVerticalSliderViewport, unknown>) {
        super(params);
        this.painter = this.viewport.getCanvasPainter();
        this.renderSelf();
        this.notifyRenderChanges();
    }

    public renderSelf(): void {
        this.painter.drawBackground(this.layerContext, this.getLayerRenderRect());
    }
}