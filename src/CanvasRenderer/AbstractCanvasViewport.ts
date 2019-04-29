import { Utils } from "./utils/Utils";
import { TDimensions } from "./structures/TDimensions";
import { CanvasViewportRenderer } from "./CanvasViewportRenderer";

export abstract class AbstractCanvasViewport {

    protected container: HTMLElement;
    protected viewportElement: HTMLElement;
    protected canvasViewportRenderer: CanvasViewportRenderer;

    constructor(container: HTMLElement) {
        this.container = container;
        this.construct(container);
        this.canvasViewportRenderer = new CanvasViewportRenderer(this.viewportElement);
    }

    protected renderView() {
        this.canvasViewportRenderer.renderView();
    }

    protected abstract createLayers(): void;

    private construct(container: HTMLElement) {
        const viewportElement: HTMLElement = document.createElement('div');
        viewportElement.style.height = "100%";
        viewportElement.style.width = "100%";
        viewportElement.style.position = "relative";
        container.appendChild(viewportElement);
        this.viewportElement = viewportElement;
    };

    protected getViewportDimensions(): TDimensions {
        return this.canvasViewportRenderer.getViewportDimensions();
    }

}