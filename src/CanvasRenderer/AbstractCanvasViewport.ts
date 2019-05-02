import { CanvasStage } from "./CanvasStage";
import { ILayer } from "./interfaces/ILayer";
import { TDimensions } from "./structures/TDimensions";

export abstract class AbstractCanvasViewport {

    protected container: HTMLElement;
    private mainStage: CanvasStage;

    constructor(container: HTMLElement) {
        this.container = container;
        this.mainStage = new CanvasStage(container);
    }

    protected abstract createLayers(): void;

    protected addLayer(layer: ILayer) {
        this.mainStage.addLayer(layer);
    }

    protected getStageDimensions(): TDimensions {
        return this.mainStage.getDisplayDimensions();
    }

    protected renderStage(): void {
        this.mainStage.render();
    }

}