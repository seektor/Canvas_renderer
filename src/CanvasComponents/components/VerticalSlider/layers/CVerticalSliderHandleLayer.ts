import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { BaseCanvasPainter } from '../../../../CanvasRenderer/utils/painter/BaseCanvasPainter';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { VerticalSliderCanvasPainter } from '../styles/VerticalSliderCanvasPainter';
import { TVerticalSliderViewState } from '../structures/TVerticalSliderViewState';

export class CVerticalSliderHandlerLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    private painter: VerticalSliderCanvasPainter;

    constructor(layerHost: ILayerHost, model: CVerticalSliderModel, layerParamsExtractor: ILayerParamsExtractor) {
        super(layerHost, model, layerParamsExtractor);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        const viewState: TVerticalSliderViewState = this.model.getViewState();
        this.painter.drawHandle(this.layerContext, { height: this.layerHeight, width: this.layerWidth, x: this.sX, y: this.sY });
    }
}