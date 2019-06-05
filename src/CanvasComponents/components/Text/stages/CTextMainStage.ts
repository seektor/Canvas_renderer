import { AbstractCanvasMainStage } from '../../../../CanvasRenderer/AbstractCanvasMainStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CTextModel } from '../CTextModel';
import { CTextViewport } from '../CTextViewport';
import { CTextContentLayer } from '../layers/CTextContentLayer';
import { CTextPainter } from '../styles/CTextPainter';


export class CTextMainStage extends AbstractCanvasMainStage {

    protected model: CTextModel;
    protected viewport: CTextViewport;
    private canvasPainter: CTextPainter;

    constructor(params: TLayerParams<CTextModel, CTextViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.createLayers();
    }

    protected renderSelfLayer() {
        this.canvasPainter.drawBackground(this.layerContext, this.getLayerRect());
    }

    private getContentLayerParams(): TLayerRenderParams {
        const borderWidth: number = this.canvasPainter.getBorderWidth();
        return {
            height: Math.max(this.layerHeight - 2 * borderWidth, 0),
            width: this.layerWidth,
            dX: 0,
            dY: borderWidth
        }
    }

    protected createLayers(): void {
        const contentLayer: ILayer = new CTextContentLayer({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: () => this.getContentLayerParams()
        });
        this.addLayer(contentLayer);
    }
}