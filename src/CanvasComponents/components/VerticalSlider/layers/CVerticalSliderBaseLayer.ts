import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { VerticalSliderCanvasPainter } from '../styles/VerticalSliderCanvasPainter';
import { TVerticalSliderViewState } from '../structures/TVerticalSliderViewState';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TLayerRect } from '../../../../CanvasRenderer/structures/TLayerRect';

export class CVerticalSliderBaseLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    private painter: VerticalSliderCanvasPainter;

    constructor(layerHost: ILayerHost, model: CVerticalSliderModel, layerParamsExtractor: ILayerParamsExtractor) {
        super(layerHost, model, layerParamsExtractor);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        const viewState: TVerticalSliderViewState = this.model.getViewState();
        const borderWidth: number = Math.round((viewState.sliderRect.width - viewState.trackRect.width) * 0.5);
        this.painter.drawBackground(this.layerContext, { height: this.layerHeight, width: this.layerWidth, x: this.sX, y: this.sY }, borderWidth);
        const topBtnRect: TLayerRect = this.model.getViewState().topButtonRect;
        this.painter.drawArrowButton(this.layerContext, { height: topBtnRect.height, width: topBtnRect.width, x: topBtnRect.dX, y: topBtnRect.dY }, Direction.Up);
        const btmBtnRect: TLayerRect = this.model.getViewState().bottomButtonRect;
        this.painter.drawArrowButton(this.layerContext, { height: btmBtnRect.height, width: btmBtnRect.width, x: btmBtnRect.dX, y: btmBtnRect.dY }, Direction.Down);
    }
}