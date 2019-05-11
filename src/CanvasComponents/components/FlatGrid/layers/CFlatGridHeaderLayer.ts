import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TLayerRect } from '../../../../CanvasRenderer/structures/TLayerRect';
import { CFlatGridModel } from '../CFlatGridModel';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';

export class CFlatGridHeaderLayer extends AbstractCanvasLayer {

    protected model: CFlatGridModel;
    private painter: CFlatGridPainter;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.painter.drawHeader(this.layerContext, { y: this.sY, x: this.sX, height: this.sHeight, width: this.sWidth });
    }
}