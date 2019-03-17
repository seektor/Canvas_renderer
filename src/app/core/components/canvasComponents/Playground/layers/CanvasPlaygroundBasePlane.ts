import { AbstractCanvasLayer } from "../../../../CanvasRenderer/AbstractCanvasLayer";
import { TLayer } from "../../../../CanvasRenderer/structures/TLayer";

export class CanvasPlaygroundBaseLayer extends AbstractCanvasLayer {

    constructor(layerParameters: TLayer) {
        super(layerParameters);
        this.render();
    }

    protected render() {
        this.layerContext.beginPath();
        this.layerContext.lineWidth = 5;
        this.layerContext.moveTo(100, 20);
        this.layerContext.lineTo(125, 300);
        this.layerContext.stroke();
    }

}