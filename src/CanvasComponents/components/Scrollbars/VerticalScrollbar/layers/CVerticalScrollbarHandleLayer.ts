import { AbstractCanvasLayer } from '../../../../../CanvasRenderer/AbstractCanvasLayer';
import { CursorType } from '../../../../../CanvasRenderer/structures/CursorType';
import { TCoords } from '../../../../../CanvasRenderer/structures/TCoords';
import { TDeltas } from '../../../../../CanvasRenderer/structures/TDeltas';
import { TParentRelativeCoords } from '../../../../../CanvasRenderer/structures/TLayerCoords';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { Utils } from '../../../../../CanvasRenderer/utils/Utils';
import { CVerticalScrollbarModel } from '../CVerticalScrollbarModel';
import { CVerticalScrollbarViewport } from '../CVerticalScrollbarViewport';
import { CVerticalScrollbarPainter } from '../styles/CVerticalScrollbarPainter';

export class CVerticalScrollbarHandleLayer extends AbstractCanvasLayer {

    protected model: CVerticalScrollbarModel;
    protected viewport: CVerticalScrollbarViewport;
    private painter: CVerticalScrollbarPainter;

    private isDragged: boolean;
    private trackLength: number;
    private dragStartDY: number;

    constructor(params: TLayerParams<CVerticalScrollbarModel, CVerticalScrollbarViewport, unknown>) {
        super(params);
        this.painter = this.viewport.getCanvasPainter();
        this.isDragged = false;
        this.onLayerDidResize();
        this.renderSelf();
        this.notifyRenderChanges();
        this.model.onScrollDimensionsDidChange$.subscribe(() => this.onScrollDimensionsDidChange());
        this.model.onScrollbarRatioExternalChange$.subscribe((ratio) => this.onUpdatePositionFromExternalChange(ratio));
    }

    private onScrollDimensionsDidChange(): void {
        this.onResize();
    }

    protected onLayerDidResize(): void {
        this.trackLength = this.layerHost.getLayerDisplayRect().height;
        this.dragStartDY = this.dY;
    }

    private onUpdatePositionFromExternalChange(ratio: number): void {
        this.updatePositionFromExternalChange(ratio);
        this.notifyRenderChanges();
    }

    public renderSelf(): void {
        this.painter.drawHandle(this.layerContext, this.getLayerRenderRect());
    }

    public onActionEnter(): void {
        this.viewport.setCursor(CursorType.Grab);
    }

    public onActionStart(coords: TParentRelativeCoords): void {
        this.isDragged = true;
        this.dragStartDY = this.dY;
    }

    public onActionEnd(coords: TCoords): void {
        this.isDragged = false;
        if (!this.isPierced(coords)) {
            this.viewport.setCursor(CursorType.Auto);
        }
    }

    public onActionDrag(deltas: TDeltas): void {
        this.updatePositionFromActionDrag(deltas.dY);
        this.notifyRenderChanges();
    }

    public onActionLeave(): void {
        if (!this.isDragged) {
            this.viewport.setCursor(CursorType.Auto);
        }
    }

    private updatePositionFromActionDrag(deltaY: number) {
        const maxDY: number = this.trackLength - this.layerHeight;
        const newDY: number = Utils.clampValue(this.dragStartDY + deltaY, 0, maxDY);
        const ratio: number = newDY / maxDY;
        this.dY = Utils.clampValue(this.dragStartDY + deltaY, 0, maxDY);
        this.model.setScrollbarRatio(ratio);
    }

    private updatePositionFromExternalChange(ratio: number) {
        const maxDY: number = this.trackLength - this.layerHeight;
        const newDY: number = maxDY * ratio;
        this.dY = newDY;
        this.notifyRenderChanges();
    }
}