import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CLineChartModel } from '../CLineChartModel';
import { CLineChartViewport } from '../CLineChartViewport';
import { CLineChartPainter } from '../styles/CLineChartPainter';

export class CLineChartDataLayer extends AbstractCanvasLayer {

    protected model: CLineChartModel;
    protected viewport: CLineChartViewport;
    private canvasPainter: CLineChartPainter;

    constructor(params: TLayerParams<CLineChartModel, CLineChartViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.clear();
        this.canvasPainter.drawDataLine(this.layerContext, this.getLayerRect(), this.model.getTemporaryRatioData());
    }
}