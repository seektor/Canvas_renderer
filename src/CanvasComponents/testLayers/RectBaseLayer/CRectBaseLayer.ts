import { AbstractCanvasLayer } from '../../../CanvasRenderer/AbstractCanvasLayer';
import { TCRectBaseLayerParams } from './structures/TCRectBaseLayerParams';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { ILayerParamsExtractor } from '../../../CanvasRenderer/interfaces/ILayerParamsExtractor';

export class CRectBaseLayer extends AbstractCanvasLayer {

    private backgroundColor: string;

    constructor(layerHost: ILayerHost, model: AbstractCanvasModel, layerParamsExtractor: ILayerParamsExtractor, backgroundColor: string) {
        super(layerHost, model, layerParamsExtractor);
        this.backgroundColor = backgroundColor;
        this.renderSelf();
    }

    protected renderSelf(): void {
        this.layerContext.fillStyle = this.backgroundColor;
        this.layerContext.fillRect(0, 0, this.layerWidth, this.layerHeight);
    }

}