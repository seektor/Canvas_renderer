import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TVerticalSliderButtonParams } from '../structures/TVerticalSliderButtonParams';

export class CVerticalSliderButtonLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    private painter: CVerticalSliderPainter;
    private direction: Direction.Up | Direction.Down;

    constructor(layerHost: ILayerHost, model: CVerticalSliderModel, layerParamsExtractor: ILayerParamsExtractor, params: TVerticalSliderButtonParams) {
        super(layerHost, model, layerParamsExtractor);
        this.direction = params.direction;
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.painter.drawArrowButton(this.layerContext, this.getLayerRect(), this.direction);
    }
}