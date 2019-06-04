import { AbstractCanvasLayer } from '../../../../../CanvasRenderer/AbstractCanvasLayer';
import { CursorType } from '../../../../../CanvasRenderer/structures/CursorType';
import { TCoords } from '../../../../../CanvasRenderer/structures/TCoords';
import { TDeltas } from '../../../../../CanvasRenderer/structures/TDeltas';
import { TParentRelativeCoords } from '../../../../../CanvasRenderer/structures/TLayerCoords';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { Utils } from '../../../../../CanvasRenderer/utils/Utils';
import { CHorizontalScrollbarModel } from '../CHorizontalScrollbarModel';
import { CHorizontalScrollbarViewport } from '../CHorizontalScrollbarViewport';
import { CHorizontalScrollbarPainter } from '../styles/CHorizontalScrollbarPainter';

export class CHorizontalScrollbarHandleLayer extends AbstractCanvasLayer {

    protected model: CHorizontalScrollbarModel;
    protected viewport: CHorizontalScrollbarViewport;
    private painter: CHorizontalScrollbarPainter;

    private isDragged: boolean;
    private trackLength: number;
    private dragStartDX: number;

    constructor(params: TLayerParams<CHorizontalScrollbarModel, CHorizontalScrollbarViewport, unknown>) {
        super(params);
        this.painter = this.viewport.getCanvasPainter();
        this.isDragged = false;
        this.onLayerDidResize();
        this.renderSelf();
        this.notifyRenderChanges();
        this.model.onScrollDimensionsDidChange$.subscribe(() => this.onResize());
        this.model.onScrollbarRatioExternalChange$.subscribe((ratio) => this.onUpdatePositionFromExternalChange(ratio));
    }

    protected onLayerDidResize(): void {
        this.trackLength = this.layerHost.getLayerDestinationRect().width;
        this.dragStartDX = this.dY;
    }

    private onUpdatePositionFromExternalChange(ratio: number): void {
        this.updatePositionFromExternalChange(ratio);
        this.notifyRenderChanges();
    }

    public renderSelf(): void {
        this.painter.drawHandle(this.layerContext, this.getLayerSourceRect());
    }

    public onActionEnter(): void {
        this.viewport.setCursor(CursorType.Grab);
    }

    public onActionStart(coords: TParentRelativeCoords): void {
        this.isDragged = true;
        this.dragStartDX = this.dX;
    }

    public onActionEnd(coords: TCoords): void {
        this.isDragged = false;
        if (!this.isPierced(coords)) {
            this.viewport.setCursor(CursorType.Auto);
        }
    }

    public onActionDrag(deltas: TDeltas): void {
        this.updatePositionFromActionDrag(deltas.dX);
        this.notifyRenderChanges();
    }

    public onActionLeave(): void {
        if (!this.isDragged) {
            this.viewport.setCursor(CursorType.Auto);
        }
    }

    private updatePositionFromActionDrag(deltaX: number) {
        const maxDX: number = this.trackLength - this.layerWidth;
        const newDX: number = Utils.clampValue(this.dragStartDX + deltaX, 0, maxDX);
        const ratio: number = newDX / maxDX;
        this.dX = Utils.clampValue(this.dragStartDX + deltaX, 0, maxDX);
        this.model.setScrollbarRatio(ratio);
    }

    private updatePositionFromExternalChange(ratio: number) {
        const maxDX: number = this.trackLength - this.layerWidth;
        const newDX: number = maxDX * ratio;
        this.dX = newDX;
        this.notifyRenderChanges();
    }
}