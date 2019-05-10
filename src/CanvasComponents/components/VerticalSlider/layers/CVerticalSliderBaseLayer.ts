import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';
import { TVerticalSliderViewState } from '../structures/TVerticalSliderViewState';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TLayerRect } from '../../../../CanvasRenderer/structures/TLayerRect';
import { ILayerViewport } from '../../../../CanvasRenderer/interfaces/ILayerViewport';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';

export class CVerticalSliderBaseLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    private painter: CVerticalSliderPainter;

    constructor(params: TLayerParams<CVerticalSliderModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.painter.drawBackground(this.layerContext, this.getLayerDisplayRect());
    }
}