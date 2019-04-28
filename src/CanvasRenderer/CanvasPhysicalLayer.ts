import { TDimensions } from "./structures/TDimensions";

export class CanvasPhysicalLayer {

    private displayCanvas: HTMLCanvasElement;
    private displayCanvasContext: CanvasRenderingContext2D;

    constructor(params: TDimensions) {
        this.createDisplayCanvas(params);
    }

    public getLayerElement(): HTMLCanvasElement {
        return this.displayCanvas;
    }

    private createDisplayCanvas(dimensions: TDimensions) {
        const displayCanvas: HTMLCanvasElement = document.createElement(`canvas`);
        displayCanvas.width = dimensions.width;
        displayCanvas.height = dimensions.height;
        displayCanvas.style.display = `block`;
        this.displayCanvas = displayCanvas;
        this.displayCanvasContext = this.displayCanvas.getContext(`2d`);
    }
}