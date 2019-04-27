import { TDimensions } from "../app/structures/TDimensions";
import { AbstractCanvasLayer } from "./AbstractCanvasLayer";
import { TLayer } from "./structures/TLayer";

export class LayersRenderer {

    private dx: number;
    private dy: number;
    private bufferCanvas: HTMLCanvasElement;
    private bufferCanvasContext: CanvasRenderingContext2D;

    private layers: AbstractCanvasLayer[] = [];

    constructor(params: TLayer) {
        this.dx = params.dX || 0;
        this.dy = params.dY || 0;
        this.createBufferCanvas(params.width, params.height);
    }

    private createBufferCanvas(width: number, height: number) {
        this.bufferCanvas = document.createElement(`canvas`);
        this.bufferCanvas.width = width;
        this.bufferCanvas.height = height;
        this.bufferCanvas.style.display = `block`;
        this.bufferCanvasContext = this.bufferCanvas.getContext(`2d`);
    }

    public addLayer(layer: AbstractCanvasLayer) {
        this.layers.push(layer);
    }

    public renderView(context: CanvasRenderingContext2D) {
        context.drawImage(this.bufferCanvas, this.dx, this.dy);
    }

    public renderBuffer() {
        this.layers.forEach(layer => layer.drawOn(this.bufferCanvasContext));
    }
}