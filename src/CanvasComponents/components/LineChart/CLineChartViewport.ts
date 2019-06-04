import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CLineChartModel } from './CLineChartModel';
import { CLineChartMainStage } from './stages/CLineChartMainStage';
import { CLineChartPainter } from './styles/CLineChartPainter';

export class CLineChartViewport extends AbstractCanvasViewport implements ILayerHost {

    protected model: CLineChartModel;
    protected canvasPainter: CLineChartPainter;

    constructor(model: CLineChartModel) {
        super(model);
        this.canvasPainter = new CLineChartPainter();
    }

    protected createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): CLineChartMainStage {
        return new CLineChartMainStage({ viewport: this, model: this.model, layerHost, layerParamsExtractor });
    }

    public getCanvasPainter(): CLineChartPainter {
        return this.canvasPainter;
    }
}