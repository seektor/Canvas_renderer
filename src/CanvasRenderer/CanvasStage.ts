import { TDimensions } from "./structures/TDimensions";
import { Utils } from "./utils/Utils";
import { ILayer } from "./interfaces/ILayer";

export class CanvasStage {

    private container: HTMLElement;
    private displayCanvas: HTMLCanvasElement;
    private displayCanvasContext: CanvasRenderingContext2D;
    private drawBufferCanvas: HTMLCanvasElement;
    private drawBufferCanvasContext: CanvasRenderingContext2D;

    private layers: ILayer[];

    constructor(container: HTMLElement) {
        this.container = container;
        this.layers = [];
        this.construct(container);
    }

    private construct(container: HTMLElement) {
        const containerDimensions: TDimensions = Utils.getElementDimensions(container);
        this.createDisplayCanvas(containerDimensions);
        container.appendChild(this.displayCanvas);
        this.createDrawBufferCanvas(containerDimensions);
    }

    private createDisplayCanvas(dimensions: TDimensions) {
        const displayCanvas: HTMLCanvasElement = document.createElement(`canvas`);
        displayCanvas.width = dimensions.width;
        displayCanvas.height = dimensions.height;
        displayCanvas.style.display = `block`;
        this.displayCanvas = displayCanvas;
        this.displayCanvasContext = this.displayCanvas.getContext(`2d`);
    }

    private createDrawBufferCanvas(dimensions: TDimensions) {
        const drawBufferCanvas: HTMLCanvasElement = document.createElement(`canvas`);
        drawBufferCanvas.width = dimensions.width;
        drawBufferCanvas.height = dimensions.height;
        drawBufferCanvas.style.display = `block`;
        this.drawBufferCanvas = drawBufferCanvas;
        this.drawBufferCanvasContext = this.displayCanvas.getContext(`2d`);
    }

    public render() {
        this.layers.forEach(layer => layer.render(this.drawBufferCanvasContext));
        this.displayCanvasContext.drawImage(this.drawBufferCanvas, 0, 0);
    }

    public addLayer(layer: ILayer) {
        this.layers.push(layer);
    }

    public getDisplayDimensions(): TDimensions {
        return Utils.getElementDimensions(this.displayCanvas);
    }
}