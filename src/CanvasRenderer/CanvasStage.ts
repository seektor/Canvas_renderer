import { TDimensions } from "../app/structures/TDimensions";
import { AbstractCanvasLayer } from "./AbstractCanvasLayer";
import { TLayer } from "./structures/TLayer";

export class CanvasStage {

    private dx: number;
    private dy: number;
    private bufferCanvas: HTMLCanvasElement;
    private bufferCanvasContext: CanvasRenderingContext2D;

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

    public render(context: CanvasRenderingContext2D) {
        context.drawImage(this.bufferCanvas, this.dx, this.dy);
    }
}