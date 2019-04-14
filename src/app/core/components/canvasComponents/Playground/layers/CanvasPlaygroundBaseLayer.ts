import { AbstractCanvasLayer } from "../../../../CanvasRenderer/AbstractCanvasLayer";
import { TLayer } from "../../../../CanvasRenderer/structures/TLayer";

export class CanvasPlaygroundBaseLayer extends AbstractCanvasLayer {

    constructor(layerParameters: TLayer) {
        super(layerParameters);
        this.render();
    }

    protected render() {
        this.layerContext.beginPath();
        this.layerContext.lineWidth = 1;
        this.layerContext.moveTo(100, 100);
        this.layerContext.lineTo(1000, 120);
        this.layerContext.stroke();

        this.layerContext.beginPath();
        this.layerContext.lineWidth = 2;
        this.layerContext.moveTo(100, 180);
        this.layerContext.lineTo(1000, 280);
        this.layerContext.stroke();

        // this.layerContext.rotate(Math.PI / 20)
        this.layerContext.beginPath();
        this.layerContext.lineWidth = 2;
        this.layerContext.moveTo(100, 20);
        this.layerContext.lineTo(1000, 20);

        this.layerContext.stroke();
    }

}