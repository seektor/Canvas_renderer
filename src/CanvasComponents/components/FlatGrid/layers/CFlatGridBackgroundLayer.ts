import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CFlatGridModel } from '../CFlatGridModel';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';

export class CFlatGridBackgroundLayer extends AbstractCanvasLayer {

    protected model: CFlatGridModel;
    private painter: CFlatGridPainter;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.painter.drawBackground(this.layerContext, { y: this.sY, x: this.sX, height: this.layerHeight, width: this.layerWidth });
    }
}