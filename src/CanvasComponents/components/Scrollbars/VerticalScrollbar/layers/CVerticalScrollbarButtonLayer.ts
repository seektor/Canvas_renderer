import { AbstractCanvasLayer } from '../../../../../CanvasRenderer/AbstractCanvasLayer';
import { CursorType } from '../../../../../CanvasRenderer/structures/CursorType';
import { Direction } from '../../../../../CanvasRenderer/structures/Direction';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { TScrollbarButtonParams } from '../../structures/TScrollbarButtonParams';
import { CVerticalScrollbarModel } from '../CVerticalScrollbarModel';
import { CVerticalScrollbarViewport } from '../CVerticalScrollbarViewport';
import { CVerticalScrollbarPainter } from '../styles/CVerticalScrollbarPainter';

export class CVerticalScrollbarButtonLayer extends AbstractCanvasLayer {

    protected model: CVerticalScrollbarModel;
    protected viewport: CVerticalScrollbarViewport;
    private canvasPainter: CVerticalScrollbarPainter;
    private direction: Direction.Up | Direction.Down;
    private callback: () => void;

    constructor(params: TLayerParams<CVerticalScrollbarModel, CVerticalScrollbarViewport, TScrollbarButtonParams<Direction.Up | Direction.Down>>) {
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