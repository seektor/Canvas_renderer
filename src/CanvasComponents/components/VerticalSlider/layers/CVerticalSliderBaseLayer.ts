import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { BaseCanvasPainter } from '../../../../CanvasRenderer/utils/painter/BaseCanvasPainter';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';

export class CVerticalSliderBaseLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    private painter: BaseCanvasPainter;

    constructor(layerHost: ILayerHost, model: CVerticalSliderModel, layerParamsExtractor: ILayerParamsExtractor) {
        super(layerHost, model, layerParamsExtractor);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.painter.fillRect(this.layerContext, { height: this.layerHeight, width: this.layerWidth, x: 0, y: 0 }, {
            fillStyle: "blue"
        });
    }
}