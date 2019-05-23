import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CDigitalDisplayModel } from '../CDigitalDIsplayModel';
import { CDigitalDisplayViewport } from '../CDigitalDisplayViewport';
import { CDigitalDisplayPainter } from '../styles/CDigitalDisplayPainter';

export class CDigitalDisplayContentLayer extends AbstractCanvasLayer {

    protected model: CDigitalDisplayModel;
    private painter: CDigitalDisplayPainter;

    constructor(params: TLayerParams<CDigitalDisplayModel, CDigitalDisplayViewport, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
        setInterval(() => this.renderSelf(), 60000);
    }

    public renderSelf(): void {
        this.clear();
        this.painter.renderDisplay(this.layerContext, this.getLayerRect());
        this.notifyRenderChanges();
    }
}