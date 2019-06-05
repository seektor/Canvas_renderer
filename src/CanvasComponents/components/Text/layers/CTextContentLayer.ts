import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CTextModel } from '../CTextModel';
import { CTextViewport } from '../CTextViewport';
import { CTextPainter } from '../styles/CTextPainter';

export class CTextContentLayer extends AbstractCanvasLayer {

    protected model: CTextModel;
    protected viewport: CTextViewport;
    private canvasPainter: CTextPainter;

    constructor(params: TLayerParams<CTextModel, CTextViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.renderSelf();
        this.notifyRenderChanges();
    }

    public renderSelf(): void {
        this.clear();
        this.canvasPainter.drawContent(this.layerContext, this.getLayerDestinationRect(), this.model.getData());
    }
}