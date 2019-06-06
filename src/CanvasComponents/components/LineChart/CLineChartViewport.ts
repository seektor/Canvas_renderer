import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { TDimensions } from '../../../CanvasRenderer/structures/TDimensions';
import { TRect } from '../../../CanvasRenderer/structures/TRect';
import { CLineChartModel } from './CLineChartModel';
import { CLineChartAxesLayer } from './layers/CLineChartAxesLayer';
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

    public getChartDataLayerRect(layer: CLineChartMainStage | CLineChartAxesLayer): TRect {
        const parentLayerDimensions: TDimensions = layer.getLayerDimensions();
        const topPadding: number = Math.min(Math.round(parentLayerDimensions.height * 0.1), 10);
        const bottomPadding: number = Math.min(Math.round(parentLayerDimensions.height * 0.2), 30);
        const leftPadding: number = Math.min(bottomPadding, parentLayerDimensions.width);
        return {
            height: parentLayerDimensions.height - topPadding - bottomPadding,
            width: parentLayerDimensions.width - leftPadding,
            x: leftPadding,
            y: topPadding
        }
    }
}