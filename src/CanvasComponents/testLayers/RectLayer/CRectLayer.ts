import { AbstractCanvasBaseLayer } from "../../../CanvasRenderer/AbstractCanvasBaseLayer";
import { TCRectLayerParams } from "./structures/TCRectLayerParams";

export class CRectLayer extends AbstractCanvasBaseLayer {

    private backgroundColor: string;

    constructor(params: TCRectLayerParams) {
        super(params);
        this.backgroundColor = params.backgroundColor;
        this.render();
    }

    protected render() {
        this.layerContext.fillStyle = this.backgroundColor;
        this.layerContext.fillRect(0, 0, this.layerWidth, this.layerHeight);
    }

}