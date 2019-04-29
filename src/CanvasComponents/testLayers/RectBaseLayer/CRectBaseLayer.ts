import { AbstractCanvasBaseLayer } from "../../../CanvasRenderer/AbstractCanvasBaseLayer";
import { TCRectBaseLayerParams } from "./structures/TCRectBaseLayerParams";

export class CRectBaseLayer extends AbstractCanvasBaseLayer {

    private backgroundColor: string;

    constructor(params: TCRectBaseLayerParams) {
        super(params);
        this.backgroundColor = params.backgroundColor;
        this.render();
    }

    protected render() {
        this.layerContext.fillStyle = this.backgroundColor;
        this.layerContext.fillRect(0, 0, this.layerWidth, this.layerHeight);
    }

}