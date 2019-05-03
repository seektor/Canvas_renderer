import { AbstractCanvasBaseLayer } from "../../../CanvasRenderer/AbstractCanvasBaseLayer";
import { TCRectBaseLayerParams } from "./structures/TCRectBaseLayerParams";
import { ILayerHost } from "../../../CanvasRenderer/interfaces/ILayerHost";

export class CRectBaseLayer extends AbstractCanvasBaseLayer {

    private backgroundColor: string;

    constructor(layerHost: ILayerHost, params: TCRectBaseLayerParams) {
        super(layerHost, params);
        this.backgroundColor = params.backgroundColor;
        this.renderSelf();
    }

    protected renderSelf() {
        this.layerContext.fillStyle = this.backgroundColor;
        this.layerContext.fillRect(0, 0, this.layerWidth, this.layerHeight);
    }

}