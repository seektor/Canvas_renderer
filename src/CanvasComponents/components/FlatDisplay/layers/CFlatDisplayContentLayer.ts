import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CFlatDisplayModel } from '../CFlatDisplayModel';
import { CFlatDisplayViewport } from '../CFlatDisplayViewport';
import { CFlatDisplayPainter } from '../styles/CFlatDisplayPainter';

export class CFlatDisplayContentLayer extends AbstractCanvasLayer {

    protected model: CFlatDisplayModel;
    protected viewport: CFlatDisplayViewport;
    private canvasPainter: CFlatDisplayPainter;

    constructor(params: TLayerParams<CFlatDisplayModel, CFlatDisplayViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.clear();
        this.canvasPainter.drawContent(this.layerContext, this.getLayerRect(), "123,456,789$ +33.3%");
        this.notifyRenderChanges();
    }
}