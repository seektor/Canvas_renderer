import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CDigitalDisplayModel } from '../CDigitalDIsplayModel';
import { CDigitalDisplayViewport } from '../CDigitalDisplayViewport';
import { CDigitalDisplayPainter } from '../styles/CDigitalDisplayPainter';

export class CDigitalDisplayBaseLayer extends AbstractCanvasLayer {

    protected model: CDigitalDisplayModel;
    private painter: CDigitalDisplayPainter;

    constructor(params: TLayerParams<CDigitalDisplayModel, CDigitalDisplayViewport, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.painter.drawExternalCircle(this.layerContext, this.getLayerRect());

    }
}