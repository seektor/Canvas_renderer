import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CLineChartModel } from '../CLineChartModel';
import { CLineChartPainter } from '../styles/CLineChartPainter';

export class CLineChartMainStage extends AbstractCanvasStage {

    protected model: CLineChartModel;
    protected canvasPainter: CLineChartPainter;

    constructor(params: TLayerParams<CLineChartModel, unknown>) {
        super(params);
        this.canvasPainter = this.model.getCanvasPainter();
        this.createLayers();
    }

    protected renderSelfLayer(): void {
        this.model.getCanvasPainter().drawBackground(this.layerContext, this.getLayerRect());
    }

    protected createLayers(): void {

    }
}