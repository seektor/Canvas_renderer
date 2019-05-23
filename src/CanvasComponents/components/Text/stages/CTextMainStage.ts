import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CTextModel } from '../CTextModel';
import { CTextViewport } from '../CTextViewport';
import { CTextPainter } from '../styles/CTextPainter';


export class CTextMainStage extends AbstractCanvasStage {

    protected model: CTextModel;
    private painter: CTextPainter;

    constructor(params: TLayerParams<CTextModel, CTextViewport, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.createLayers();
    }

    protected renderSelfLayer() {
        this.model.getCanvasPainter().drawBackground(this.layerContext, this.getLayerRect());
    }

    protected createLayers(): void {

    }
}