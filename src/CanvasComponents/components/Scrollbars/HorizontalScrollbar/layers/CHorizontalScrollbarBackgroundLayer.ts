import { AbstractCanvasLayer } from '../../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { CHorizontalScrollbarModel } from '../CHorizontalScrollbarModel';
import { CHorizontalScrollbarViewport } from '../CHorizontalScrollbarViewport';
import { CHorizontalScrollbarPainter } from '../styles/CHorizontalScrollbarPainter';

export class CHorizontalScrollbarBackgroundLayer extends AbstractCanvasLayer {

    protected model: CHorizontalScrollbarModel;
    protected viewport: CHorizontalScrollbarViewport;
    private painter: CHorizontalScrollbarPainter;

    constructor(params: TLayerParams<CHorizontalScrollbarModel, CHorizontalScrollbarViewport, unknown>) {
        super(params);
        this.painter = this.viewport.getCanvasPainter();
        this.renderSelf();
        this.notifyRenderChanges();
    }

    public renderSelf(): void {
        this.painter.drawBackground(this.layerContext, this.getLayerSourceRect());
    }
}