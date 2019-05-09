import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';
import { CursorType } from '../../../../CanvasRenderer/structures/CursorType';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TParentRelativeCoords } from '../../../../CanvasRenderer/structures/TLayerCoords';

export class CVerticalSliderHandleLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    private painter: CVerticalSliderPainter;

    constructor(params: TLayerParams<CVerticalSliderModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.painter.drawHandle(this.layerContext, this.getLayerRect());
        this.notifyRenderChanges();
    }

    public onActionEnter(): void {
        this.globalViewport.setCursor(CursorType.Grab);
    }

    public onActionStart(coords: TParentRelativeCoords): void {
        this.dY += 20;
        console.log(this.dY);
        this.notifyRenderChanges();
    }

    public onActionEnd(): void {
        this.globalViewport.setCursor(CursorType.Auto);
    }

    public onActionOut(): void {
        this.globalViewport.setCursor(CursorType.Auto);
    }
}