import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CursorType } from '../../../../CanvasRenderer/structures/CursorType';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderViewport } from '../CVerticalSliderViewport';
import { TVerticalSliderButtonParams } from '../structures/TVerticalSliderButtonParams';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';

export class CVerticalSliderButtonLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    protected viewport: CVerticalSliderViewport;
    private canvasPainter: CVerticalSliderPainter;
    private direction: Direction.Up | Direction.Down;

    constructor(params: TLayerParams<CVerticalSliderModel, CVerticalSliderViewport, TVerticalSliderButtonParams>) {
        super(params);
        this.direction = params.config.direction;
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.renderSelf(false);
        this.notifyRenderChanges();
    }

    public renderSelf(isActive: boolean): void {
        this.clear();
        this.canvasPainter.drawArrowButton(this.layerContext, this.getLayerRenderRect(), this.direction, isActive);
    }

    public onActionEnter() {
        this.renderSelf(true);
        this.viewport.setCursor(CursorType.Pointer);
    }

    public onActionLeave() {
        this.renderSelf(false);
        this.viewport.setCursor(CursorType.Auto);
    }

    public onViewportLeave() {
        this.onActionLeave();
    }
}