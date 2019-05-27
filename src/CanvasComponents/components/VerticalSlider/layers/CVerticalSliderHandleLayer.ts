import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CursorType } from '../../../../CanvasRenderer/structures/CursorType';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TDeltas } from '../../../../CanvasRenderer/structures/TDeltas';
import { TParentRelativeCoords } from '../../../../CanvasRenderer/structures/TLayerCoords';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { Utils } from '../../../../CanvasRenderer/utils/Utils';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderViewport } from '../CVerticalSliderViewport';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';

export class CVerticalSliderHandleLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    protected viewport: CVerticalSliderViewport;
    private painter: CVerticalSliderPainter;

    private isDragged: boolean;
    private trackLength: number;
    private dragStartDY: number;

    constructor(params: TLayerParams<CVerticalSliderModel, CVerticalSliderViewport, unknown>) {
        super(params);
        this.painter = this.viewport.getCanvasPainter();
        this.isDragged = false;
        this.updateProperties();
        this.renderSelf();
        this.notifyRenderChanges();
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
        this.updatePositionFromAction(deltas.dY);
        this.notifyRenderChanges();
    }

    public onActionLeave(): void {
        if (!this.isDragged) {
            this.viewport.setCursor(CursorType.Auto);
        }
    }

    private updatePositionFromAction(deltaY: number) {
        const maxDY: number = this.trackLength - this.layerHeight;
        const newDY: number = Utils.clampValue(this.dragStartDY + deltaY, 0, maxDY);
        const ratio: number = newDY / maxDY;
        this.model.setSelectedRatio(ratio);
        this.dY = Utils.clampValue(this.dragStartDY + deltaY, 0, maxDY);
    }
}