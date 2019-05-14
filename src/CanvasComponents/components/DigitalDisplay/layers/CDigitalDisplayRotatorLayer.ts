import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CDigitalDisplayPainter } from '../styles/CDigitalDisplayPainter';
import { CDigitalDisplayModel } from '../CDigitalDIsplayModel';

export class CDigitalDisplayRotatorLayer extends AbstractCanvasLayer {

    protected model: CDigitalDisplayModel;
    private painter: CDigitalDisplayPainter;
    private hostLayerCenter: TCoords;

    constructor(params: TLayerParams<CDigitalDisplayModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.hostLayerCenter = { x: 0, y: 0 };
        this.updateParams();
        this.renderSelf();
        setInterval(() => this.rotate(), 32);
    }

    protected updateParams() {
        const hostDisplayRect: TRect = this.layerHost.getLayerDisplayRect();
        this.hostLayerCenter = { x: hostDisplayRect.width * 0.5, y: hostDisplayRect.height * 0.5 };
    }

    private rotate() {
        this.notifyRenderChanges();
        this.globalViewport.forceRerender();
    }

    public render(context: CanvasRenderingContext2D): void {
        context.translate(this.hostLayerCenter.x, this.hostLayerCenter.y);
        context.rotate(Math.PI / 180);
        context.translate(-this.hostLayerCenter.x, -this.hostLayerCenter.y);
        super.render(context);
    }

    public renderSelf(): void {
        this.painter.drawRotator(this.layerContext, this.getLayerRect());
    }
}