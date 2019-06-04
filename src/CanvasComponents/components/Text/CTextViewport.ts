import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CTextModel } from './CTextModel';
import { CTextMainStage } from './stages/CTextMainStage';
import { CTextPainter } from './styles/CTextPainter';

export class CTextViewport extends AbstractCanvasViewport implements ILayerHost {

    protected model: CTextModel;
    protected canvasPainter: CTextPainter;

    constructor(model: CTextModel) {
        super(model);
    }

    protected createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): CTextMainStage {
        return new CTextMainStage({ viewport: this, model: this.model, layerHost, layerParamsExtractor });
    }

    public getCanvasPainter(): CTextPainter {
        return this.canvasPainter;
    }
}