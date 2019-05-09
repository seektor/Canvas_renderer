import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TVerticalSliderButtonParams } from '../structures/TVerticalSliderButtonParams';
import { CursorType } from '../../../../CanvasRenderer/structures/CursorType';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';

export class CVerticalSliderButtonLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    private painter: CVerticalSliderPainter;
    private direction: Direction.Up | Direction.Down;

    constructor(params: TLayerParams<CVerticalSliderModel, TVerticalSliderButtonParams>) {
        super(params);
        this.direction = params.config.direction;
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