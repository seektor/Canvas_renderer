import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CLineChartModel } from '../CLineChartModel';
import { CLineChartViewport } from '../CLineChartViewport';
import { CLineChartPainter } from '../styles/CLineChartPainter';

export class CLineChartAxesLayer extends AbstractCanvasLayer {

    protected model: CLineChartModel;
    protected viewport: CLineChartViewport;
    private canvasPainter: CLineChartPainter;

    constructor(params: TLayerParams<CLineChartModel, CLineChartViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.fillContent('orange');
    }
}