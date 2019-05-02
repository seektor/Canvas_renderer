import { TDimensions } from "./structures/TDimensions";
import { Utils } from "./utils/Utils";
import { ILayer } from "./interfaces/ILayer";
import { TStageParams } from "./structures/TStageParams";
import { TLayerRelativePosition } from "./structures/TLayerRelativePosition";

export class CanvasStage implements ILayer {

    private container: HTMLElement;
    private displayCanvas: HTMLCanvasElement;
    private displayCanvasContext: CanvasRenderingContext2D;
    private drawBufferCanvas: HTMLCanvasElement;
    private drawBufferCanvasContext: CanvasRenderingContext2D;
    private displayPosition: TLayerRelativePosition;

    private layers: ILayer[];

    constructor(container: HTMLElement, params?: TStageParams) {
        this.container = container;
        this.layers = [];
        this.construct(container, params);
    }

    private construct(container: HTMLElement, params?: TStageParams) {
        if (params) {
            this.displayPosition = { dx: params.dx, dy: params.dy, height: params.height, width: params.width };
            this.displayCanvas = params.displayCanvas;
        } else {
            const containerDimensions = Utils.getElementDimensions(container);
            this.displayPosition = { dx: 0, dy: 0, ...containerDimensions };
            this.createDisplayCanvas(containerDimensions);
            container.appendChild(this.displayCanvas);
        }
        this.createDrawBufferCanvas({ height: this.displayPosition.height, width: this.displayPosition.width });
    }

    private createDisplayCanvas(dimensions: TDimensions) {
        const displayCanvas: HTMLCanvasElement = document.createElement(`canvas`);
        displayCanvas.width = dimensions.width;
        displayCanvas.height = dimensions.height;
        displayCanvas.style.display = `block`;
        this.displayCanvasContext = displayCanvas.getContext(`2d`);
        this.displayCanvas = displayCanvas;
    }

    private createDrawBufferCanvas(dimensions: TDimensions) {
        const drawBufferCanvas: HTMLCanvasElement = document.createElement(`canvas`);
        drawBufferCanvas.width = dimensions.width;
        drawBufferCanvas.height = dimensions.height;
        drawBufferCanvas.style.display = `block`;
        this.drawBufferCanvasContext = drawBufferCanvas.getContext(`2d`);
        this.drawBufferCanvas = drawBufferCanvas;
    }

    public renderStage() {
        this.render(this.displayCanvasContext);
    }

    public render(context: CanvasRenderingContext2D) {
        this.layers.forEach(layer => layer.render(this.drawBufferCanvasContext));
        context.drawImage(this.drawBufferCanvas, this.displayPosition.dx, this.displayPosition.dy);
    }

    public addLayer(...layers: ILayer[]) {
        this.layers.push(...layers);
    }

    public getDisplayDimensions(): TDimensions {
        return this.displayPosition;
    }

    public getDisplayCanvas(): HTMLCanvasElement {
        return this.displayCanvas;
    }
}