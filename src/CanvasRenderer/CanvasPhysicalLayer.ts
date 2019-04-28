import { TDimensions } from "./structures/TDimensions";
import { CanvasLayersRenderer } from "./CanvasLayersRenderer";
import { AbstractCanvasBaseLayer } from "./AbstractCanvasBaseLayer";

export class CanvasPhysicalLayer {

    private displayCanvas: HTMLCanvasElement;
    private displayCanvasContext: CanvasRenderingContext2D;
    private canvasLayersRenderer: CanvasLayersRenderer;

    constructor(params: TDimensions) {
        this.createDisplayCanvas(params);
        this.canvasLayersRenderer = new CanvasLayersRenderer({
            ...params
        })
    }

    public renderView() {
        this.canvasLayersRenderer.prepareBuffer();
        this.canvasLayersRenderer.renderView(this.displayCanvasContext);
    }

    public getLayerElement(): HTMLCanvasElement {
        return this.displayCanvas;
    }

    public addLayer(layer: AbstractCanvasBaseLayer) {
        this.canvasLayersRenderer.addLayer(layer);
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