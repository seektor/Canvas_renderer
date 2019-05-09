import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TLayerRect } from '../../../../CanvasRenderer/structures/TLayerRect';
import { CFlatGridModel } from '../CFlatGridModel';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';

export class CFlatGridHeaderLayer extends AbstractCanvasLayer {

    protected model: CFlatGridModel;
    private painter: CanvasBasePainter;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.painter.fillRect(this.layerContext, { y: this.sY, x: this.sX, height: this.layerHeight, width: this.layerWidth }, {
            fillStyle: "blue"
        })
    }
}