import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CDigitalDisplayModel } from '../CDigitalDIsplayModel';
import { CDigitalDisplayViewport } from '../CDigitalDisplayViewport';
import { CDigitalDisplayPainter } from '../styles/CDigitalDisplayPainter';

export class CDigitalDisplayBaseLayer extends AbstractCanvasLayer {

    protected model: CDigitalDisplayModel;
    protected viewport: CDigitalDisplayViewport;
    private canvasPainter: CDigitalDisplayPainter;

    constructor(params: TLayerParams<CDigitalDisplayModel, CDigitalDisplayViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.renderSelf();
        this.notifyRenderChanges();
    }

    public renderSelf(): void {
        this.canvasPainter.drawExternalCircle(this.layerContext, this.getLayerRect());

    }
}