import { AbstractCanvasModel } from "./AbstractCanvasModel";
import { AbstractCanvasViewport } from "./AbstractCanvasViewport";

export abstract class AbstractCanvas {

    protected abstract model: AbstractCanvasModel;
    protected abstract viewport: AbstractCanvasViewport;
    protected container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }
}