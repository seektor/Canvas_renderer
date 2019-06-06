import IntervalService from '../../../../app/services/intervalService/IntervalService';
import { IntervalType } from '../../../../app/services/intervalService/structures/IntervalType';
import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CDigitalDisplayModel } from '../CDigitalDIsplayModel';
import { CDigitalDisplayViewport } from '../CDigitalDisplayViewport';
import { CDigitalDisplayPainter } from '../styles/CDigitalDisplayPainter';

export class CDigitalDisplayContentLayer extends AbstractCanvasLayer {

    protected model: CDigitalDisplayModel;
    protected viewport: CDigitalDisplayViewport;
    private canvasPainter: CDigitalDisplayPainter;

    constructor(params: TLayerParams<CDigitalDisplayModel, CDigitalDisplayViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.renderSelf();
        this.notifyRenderChanges();
        IntervalService.subscribe(IntervalType["60000ms"], () => this.renderSelf());
    }

    public renderSelf(): void {
        this.clear();
        this.canvasPainter.renderDisplay(this.layerContext, this.getLayerRect());
    }
}