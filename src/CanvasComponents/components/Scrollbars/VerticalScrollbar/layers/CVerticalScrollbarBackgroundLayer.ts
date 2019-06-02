import { AbstractCanvasLayer } from '../../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { CVerticalScrollbarModel } from '../CVerticalScrollbarModel';
import { CVerticalScrollbarViewport } from '../CVerticalScrollbarViewport';
import { CVerticalScrollbarPainter } from '../styles/CVerticalScrollbarPainter';

export class CVerticalScrollbarBackgroundLayer extends AbstractCanvasLayer {

    protected model: CVerticalScrollbarModel;
    protected viewport: CVerticalScrollbarViewport;
    private painter: CVerticalScrollbarPainter;

    constructor(params: TLayerParams<CVerticalScrollbarModel, CVerticalScrollbarViewport, unknown>) {
        super(params);
        this.painter = this.viewport.getCanvasPainter();
        this.renderSelf();
        this.notifyRenderChanges();
    }

    public renderSelf(): void {
        this.painter.drawBackground(this.layerContext, this.getLayerRenderRect());
    }
}