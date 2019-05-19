import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CursorType } from '../../../../CanvasRenderer/structures/CursorType';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TDeltas } from '../../../../CanvasRenderer/structures/TDeltas';
import { TParentRelativeCoords } from '../../../../CanvasRenderer/structures/TLayerCoords';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { Utils } from '../../../../CanvasRenderer/utils/Utils';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';

export class CVerticalSliderHandleLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    private painter: CVerticalSliderPainter;

    private isDragged: boolean;
    private trackLength: number;
    private dragStartDY: number;

    constructor(params: TLayerParams<CVerticalSliderModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.isDragged = false;
        this.updateProperties();
        this.renderSelf();
        this.model.onDimensionsDidChange$.subscribe(() => this.onResize());
    }

    private updateProperties(): void {
        this.trackLength = this.layerHost.getLayerDisplayRect().height;
        this.dragStartDY = this.dY;
    }

    public onResize() {
        super.onResize();
        this.updateProperties();
    }

    public renderSelf(): void {
        this.painter.drawHandle(this.layerContext, this.getLayerRenderRect());
        this.notifyRenderChanges();
    }

    public onActionEnter(): void {
        this.globalViewport.setCursor(CursorType.Grab);
    }

    public onActionStart(coords: TParentRelativeCoords): void {
        this.isDragged = true;
        this.dragStartDY = this.dY;
    }

    public onActionEnd(coords: TCoords): void {
        this.isDragged = false;
        if (!this.isPierced(coords)) {
            this.globalViewport.setCursor(CursorType.Auto);
        }
    }

    public onActionDrag(deltas: TDeltas): void {
        if (this.isDragged) {
            this.updatePositionFromAction(deltas.dY);
            this.notifyRenderChanges();
        }
    }

    public onActionLeave(): void {
        this.globalViewport.setCursor(CursorType.Auto);
    }

    public onViewportLeave(): void {
        this.onActionEnd();
        this.onActionLeave();
    }

    private updatePositionFromAction(deltaY: number) {
        const maxDY: number = this.trackLength - this.layerHeight;
        this.dY = Utils.clampValue(this.dragStartDY + deltaY, 0, maxDY);
    }
}