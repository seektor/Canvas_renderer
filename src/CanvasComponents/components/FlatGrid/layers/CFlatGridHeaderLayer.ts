import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TLayerRect } from '../../../../CanvasRenderer/structures/TLayerRect';
import { CFlatGridModel } from '../CFlatGridModel';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';

export class CFlatGridHeaderLayer extends AbstractCanvasLayer {

    protected model: CFlatGridModel;
    private painter: CanvasBasePainter;

    constructor(layerHost: ILayerHost, globalViewport, model: CFlatGridModel, layerParamsExtractor: ILayerParamsExtractor) {
        super(layerHost, globalViewport, model, layerParamsExtractor);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.painter.fillRect(this.layerContext, { y: this.sY, x: this.sX, height: this.layerHeight, width: this.layerWidth }, {
            fillStyle: "blue"
        })
    }
}