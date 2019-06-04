import { AbstractCanvasMainStage } from '../../../../CanvasRenderer/AbstractCanvasMainStage';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CLineChartModel } from '../CLineChartModel';
import { CLineChartViewport } from '../CLineChartViewport';
import { CLineChartAxesLayer } from '../layers/CLineChartAxesLayer';
import { CLineChartDataLayer } from '../layers/CLineChartDataLayer';
import { CLineChartPainter } from '../styles/CLineChartPainter';

export class CLineChartMainStage extends AbstractCanvasMainStage {

    protected model: CLineChartModel;
    protected viewport: CLineChartViewport;
    protected canvasPainter: CLineChartPainter;

    constructor(params: TLayerParams<CLineChartModel, CLineChartViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.createLayers();
    }

    protected renderSelfLayer(): void {
        this.canvasPainter.drawBackground(this.layerContext, this.getLayerRect());
    }

    private getAxesLayerRenderParams(): TLayerRenderParams {
        return {
            dX: 0,
            dY: 0,
            height: this.layerHeight,
            width: this.layerWidth
        }
    }

    private getDataLayerRenderParams(): TLayerRenderParams {
        const chartRect: TRect = this.canvasPainter.getChartRect(this);
        return {
            dX: chartRect.x,
            dY: chartRect.y,
            height: chartRect.height,
            width: chartRect.width
        }
    }

    protected createLayers(): void {
        const axesLayer: CLineChartAxesLayer = new CLineChartAxesLayer({ layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: (layer) => this.getAxesLayerRenderParams() });
        this.addLayer(axesLayer);

        const dataLayer: CLineChartDataLayer = new CLineChartDataLayer({ layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: (layer) => this.getDataLayerRenderParams() });
        this.addLayer(dataLayer);
    }
}