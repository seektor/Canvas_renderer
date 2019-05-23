import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CLineChartModel } from '../CLineChartModel';
import { CLineChartViewport } from '../CLineChartViewport';
import { CLineChartPainter } from '../styles/CLineChartPainter';

export class CLineChartDataLayer extends AbstractCanvasLayer {

    protected model: CLineChartModel;
    private painter: CLineChartPainter;

    constructor(params: TLayerParams<CLineChartModel, CLineChartViewport, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public renderSelf(): void {
        this.fillContent('red');
    }
}