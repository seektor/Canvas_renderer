import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CFlatDisplayModel } from '../CFlatDisplayModel';
import { CFlatDisplayViewport } from '../CFlatDisplayViewport';
import { CFlatDisplayPainter } from '../styles/CFlatDisplayPainter';

export class CFlatDisplayContentLayer extends AbstractCanvasLayer {

    protected model: CFlatDisplayModel;
    private painter: CFlatDisplayPainter;

    constructor(params: TLayerParams<CFlatDisplayModel, CFlatDisplayViewport, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.clear();
        this.painter.drawContent(this.layerContext, this.getLayerRect(), "123,456,789$ +33.3%");
        this.notifyRenderChanges();
    }
}