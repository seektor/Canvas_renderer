import { AbstractCanvasLayer } from '../../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { CHorizontalSliderModel } from '../CHorizontalSliderModel';
import { CHorizontalSliderViewport } from '../CHorizontalSliderViewport';
import { CHorizontalSliderPainter } from '../styles/CHorizontalSliderPainter';

export class CHorizontalSliderBackgroundLayer extends AbstractCanvasLayer {

    protected model: CHorizontalSliderModel;
    protected viewport: CHorizontalSliderViewport;
    private painter: CHorizontalSliderPainter;

    constructor(params: TLayerParams<CHorizontalSliderModel, CHorizontalSliderViewport, unknown>) {
        super(params);
        this.painter = this.viewport.getCanvasPainter();
        this.renderSelf();
        this.notifyRenderChanges();
    }

    public renderSelf(): void {
        this.painter.drawBackground(this.layerContext, this.getLayerRenderRect());
    }
}