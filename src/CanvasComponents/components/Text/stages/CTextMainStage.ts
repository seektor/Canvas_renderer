import { AbstractCanvasMainStage } from '../../../../CanvasRenderer/AbstractCanvasMainStage';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CTextModel } from '../CTextModel';
import { CTextViewport } from '../CTextViewport';
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

    protected createLayers(): void {

    }
}