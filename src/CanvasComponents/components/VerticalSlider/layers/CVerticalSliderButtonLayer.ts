import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CursorType } from '../../../../CanvasRenderer/structures/CursorType';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { TVerticalSliderButtonParams } from '../structures/TVerticalSliderButtonParams';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';

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
        this.clear();
        this.painter.drawArrowButton(this.layerContext, this.getLayerRenderRect(), this.direction, isActive);
        this.notifyRenderChanges();
    }

    public onActionEnter() {
        this.renderSelf(true);
        this.globalViewport.setCursor(CursorType.Pointer);
    }

    public onActionLeave() {
        this.renderSelf(false);
        this.globalViewport.setCursor(CursorType.Auto);
    }

    public onViewportLeave() {
        this.onActionLeave();
    }
}