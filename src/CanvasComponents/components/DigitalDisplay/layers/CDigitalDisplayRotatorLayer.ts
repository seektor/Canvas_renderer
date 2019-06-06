import IntervalService from '../../../../app/services/intervalService/IntervalService';
import { IntervalType } from '../../../../app/services/intervalService/structures/IntervalType';
import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CDigitalDisplayModel } from '../CDigitalDIsplayModel';
import { CDigitalDisplayViewport } from '../CDigitalDisplayViewport';
import { CDigitalDisplayPainter } from '../styles/CDigitalDisplayPainter';

export class CDigitalDisplayRotatorLayer extends AbstractCanvasLayer {

    protected model: CDigitalDisplayModel;
    protected viewport: CDigitalDisplayViewport;
    private painter: CDigitalDisplayPainter;
    private hostLayerCenter: TCoords;

    constructor(params: TLayerParams<CDigitalDisplayModel, CDigitalDisplayViewport, unknown>) {
        super(params);
        this.painter = this.viewport.getCanvasPainter();
        this.hostLayerCenter = { x: 0, y: 0 };
        this.onLayerDidResize();
        this.renderSelf();
        this.notifyRenderChanges();
        IntervalService.subscribe(IntervalType["16ms"], () => this.rotate());
    }

    protected onLayerDidResize() {
        const hostDisplayRect: TRect = this.layerHost.getLayerDestinationRect();
        this.hostLayerCenter = { x: hostDisplayRect.width * 0.5, y: hostDisplayRect.height * 0.5 };
    }

    private rotate() {
        this.notifyRenderChanges();
        this.model.rotatorDidRotate$.next();
    }

    public render(context: CanvasRenderingContext2D): void {
        context.translate(this.hostLayerCenter.x, this.hostLayerCenter.y);
        context.rotate(Math.PI / 180);
        context.translate(-this.hostLayerCenter.x, -this.hostLayerCenter.y);
        super.render(context);
    }

    public renderSelf(): void {
        this.clear();
        this.painter.drawRotator(this.layerContext, this.getLayerRect());
    }
}