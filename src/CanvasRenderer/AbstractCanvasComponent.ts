import { AbstractCanvasModel } from "./AbstractCanvasModel";
import { AbstractCanvasViewport } from "./AbstractCanvasViewport";
import { ViewportCtor } from "./interfaces/ViewportCtor";
import { TViewportParams } from "./structures/TViewportParams";
import { CanvasStage } from "./CanvasStage";
import { ILayer } from "./interfaces/ILayer";

export abstract class AbstractCanvasComponent {

    protected container: HTMLElement;
    protected abstract model: AbstractCanvasModel;
    protected abstract viewport: AbstractCanvasViewport;
    protected abstract viewportCtor: ViewportCtor<AbstractCanvasViewport>;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    public createViewport(params?: TViewportParams) {
        if (this.viewport) {
            console.warn("Viewport already exists");
            return;
        }
        this.viewport = this.viewportCtor(this.container, params);
    }

    public getMainStage(): ILayer {
        return this.viewport.getMainStage();
    }
}