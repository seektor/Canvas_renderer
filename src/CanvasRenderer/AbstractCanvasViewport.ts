import { CanvasStage } from "./CanvasStage";

export abstract class AbstractCanvasViewport {

    protected container: HTMLElement;
    protected mainStage: CanvasStage;

    constructor(container: HTMLElement) {
        this.container = container;
        this.mainStage = new CanvasStage(container);
    }

}