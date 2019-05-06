import { AbstractCanvasViewport } from './AbstractCanvasViewport';
import { TLayerRect } from './structures/TLayerRect';
import { BaseCanvasPainter } from './utils/painter/BaseCanvasPainter';

export abstract class AbstractCanvasModel {

    protected viewport: AbstractCanvasViewport;
    protected canvasPainter: BaseCanvasPainter;

    public setViewport(viewport: AbstractCanvasViewport): void {
        this.viewport = viewport;
        this.onViewportInit();
    }

    public onMainStageCreation(): void { }

    public onResize(): void { };

    public getDisplayRect(): TLayerRect {
        return this.viewport.getDisplayLayerRect();
    }

    public getCanvasPainter(): BaseCanvasPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new BaseCanvasPainter();
        }
        return this.canvasPainter;
    }

    protected onViewportInit(): void { };


}