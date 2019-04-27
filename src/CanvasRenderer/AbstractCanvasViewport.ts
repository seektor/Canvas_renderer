import { LayersRenderer } from "./LayersRenderer";
import { Utils } from "./utils/Utils";
import { TDimensions } from "./structures/TDimensions";

export abstract class AbstractCanvasViewport {

    protected container: HTMLElement;
    protected displayCanvas: HTMLCanvasElement;
    protected displayCanvasContext: CanvasRenderingContext2D;
    protected layersRenderer: LayersRenderer;

    constructor(container: HTMLElement) {
        this.container = container;
        const viewportDimensions: TDimensions = Utils.getElementDimensions(container);
        this.createDisplayCanvas(viewportDimensions);
        this.layersRenderer = new LayersRenderer(viewportDimensions);
    }

    protected abstract construct();

    private createDisplayCanvas(dimensions: TDimensions) {
        this.displayCanvas = document.createElement(`canvas`);
        this.displayCanvas.width = dimensions.width;
        this.displayCanvas.height = dimensions.height;
        this.displayCanvas.style.display = `block`;
        this.displayCanvasContext = this.displayCanvas.getContext(`2d`);
        this.container.appendChild(this.displayCanvas);
    }

    protected render() {
        this.layersRenderer.renderBuffer();
        this.layersRenderer.renderView(this.displayCanvasContext);
        // this.layers.forEach(layer => {
        //     layer.drawOn(this.displayCanvasContext);
        // });
    }

}