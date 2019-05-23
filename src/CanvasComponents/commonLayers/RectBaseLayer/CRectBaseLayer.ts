import { AbstractCanvasLayer } from '../../../CanvasRenderer/AbstractCanvasLayer';
import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { TLayerParams } from '../../../CanvasRenderer/structures/TLayerParams';
import { TCRectBaseLayerParams } from './structures/TCRectBaseLayerParams';

export class CRectBaseLayer extends AbstractCanvasLayer {

    private backgroundColor: string;

    constructor(params: TLayerParams<AbstractCanvasModel, AbstractCanvasViewport, TCRectBaseLayerParams>) {
        super(params);
        this.backgroundColor = params.config.backgroundColor;
        this.renderSelf();
    }

    protected renderSelf(): void {
        this.layerContext.fillStyle = this.backgroundColor;
        this.layerContext.fillRect(0, 0, this.layerWidth, this.layerHeight);
    }

}