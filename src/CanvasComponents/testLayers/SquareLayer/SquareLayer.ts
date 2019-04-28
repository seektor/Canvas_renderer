import { AbstractCanvasBaseLayer } from "../../../CanvasRenderer/AbstractCanvasBaseLayer";
import { TSquareLayerParams } from "./structures/TSquareLayerParams";

export class SquareLayer extends AbstractCanvasBaseLayer {

    private backgroundColor: string;

    constructor(params: TSquareLayerParams) {
        super(params);
        this.backgroundColor = params.backgroundColor;
        this.render();
    }

    protected render() {
        this.layerContext.fillStyle = this.backgroundColor;
        this.layerContext.fillRect(0, 0, this.layerWidth, this.layerHeight);
    }

}