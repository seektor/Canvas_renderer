import { CanvasVirtualLayersRenderer } from "./CanvasVirtualLayersRenderer";
import { Utils } from "./utils/Utils";
import { TDimensions } from "./structures/TDimensions";
import { CanvasViewportRenderer } from "./CanvasViewportRenderer";

export abstract class AbstractCanvasViewport {

    protected container: HTMLElement;
    protected viewportElement: HTMLElement;
    protected canvasViewportRenderer: CanvasViewportRenderer;

    constructor(container: HTMLElement) {
        this.container = container;
        this.construct();
        this.canvasViewportRenderer = new CanvasViewportRenderer(container);
    }

    protected abstract createLayers(): void;

    private construct() {
        const viewportElement: HTMLElement = document.createElement('div');
        viewportElement.style.height = "100%";
        viewportElement.style.width = "100%";
        viewportElement.style.position = "relative;"
    };

    protected render() {
        // this.layersRenderer.renderBuffer();
        // this.layersRenderer.renderView(this.displayCanvasContext);
        // this.layers.forEach(layer => {
        //     layer.drawOn(this.displayCanvasContext);
        // });
    }

}