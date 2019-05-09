import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TVerticalSliderButtonParams } from '../structures/TVerticalSliderButtonParams';
import { CursorType } from '../../../../CanvasRenderer/structures/CursorType';
import { ILayerViewport } from '../../../../CanvasRenderer/interfaces/ILayerViewport';

export class CVerticalSliderButtonLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    private painter: CVerticalSliderPainter;
    private direction: Direction.Up | Direction.Down;

    constructor(layerHost: ILayerHost, globalViewport: ILayerViewport, model: CVerticalSliderModel, layerParamsExtractor: ILayerParamsExtractor, params: TVerticalSliderButtonParams) {
        super(layerHost, globalViewport, model, layerParamsExtractor);
        this.direction = params.direction;
        this.painter = this.model.getCanvasPainter();
        this.renderSelf(false);
    }

    public renderSelf(isActive: boolean): void {
        this.painter.drawArrowButton(this.layerContext, this.getLayerRect(), this.direction, isActive);
        this.notifyRenderChanges();
    }

    public onActionEnter() {
        this.renderSelf(true);
        this.globalViewport.setCursor(CursorType.Pointer);
    }

    public onActionOut() {
        this.renderSelf(false);
        this.globalViewport.setCursor(CursorType.Auto);
    }
}