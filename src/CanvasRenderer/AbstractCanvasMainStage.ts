import { AbstractCanvasStage } from "./AbstractCanvasStage";

export abstract class AbstractCanvasMainStage extends AbstractCanvasStage {

    public onResize(): void {
        this.viewport.onBeforeMainStageResize();
        super.onResize();
    }

}