import { AbstractCanvasLayer } from '../../../../../CanvasRenderer/AbstractCanvasLayer';
import { CursorType } from '../../../../../CanvasRenderer/structures/CursorType';
import { Direction } from '../../../../../CanvasRenderer/structures/Direction';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { TScrollbarButtonParams } from '../../structures/TScrollbarButtonParams';
import { CHorizontalScrollbarModel } from '../CHorizontalScrollbarModel';
import { CHorizontalScrollbarViewport } from '../CHorizontalScrollbarViewport';
import { CHorizontalScrollbarPainter } from '../styles/CHorizontalScrollbarPainter';

export class CHorizontalScrollbarButtonLayer extends AbstractCanvasLayer {

    protected model: CHorizontalScrollbarModel;
    protected viewport: CHorizontalScrollbarViewport;
    private canvasPainter: CHorizontalScrollbarPainter;
    private direction: Direction.Left | Direction.Right;
    private callback: () => void;

    constructor(params: TLayerParams<CHorizontalScrollbarModel, CHorizontalScrollbarViewport, TScrollbarButtonParams<Direction.Left | Direction.Right>>) {
        super(params);
        this.direction = params.config.direction;
        this.callback = params.config.callback;
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.renderSelf(false);
        this.notifyRenderChanges();
    }

    public renderSelf(isActive: boolean): void {
        this.clear();
        this.canvasPainter.drawArrowButton(this.layerContext, this.getLayerSourceRect(), this.direction, isActive);
    }

    public onActionStart(): void {
        this.callback();
    }

    public onActionEnter() {
        this.renderSelf(true);
        this.viewport.setCursor(CursorType.Pointer);
        this.notifyRenderChanges();
    }

    public onActionLeave() {
        this.renderSelf(false);
        this.viewport.setCursor(CursorType.Auto);
        this.notifyRenderChanges();
    }

    public onViewportLeave() {
        this.onActionLeave();
    }
}