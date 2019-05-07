import { AbstractCanvasViewport } from './AbstractCanvasViewport';
import { TLayerRect } from './structures/TLayerRect';
import { CanvasBasePainter } from './utils/painter/CanvasBasePainter';

export abstract class AbstractCanvasModel {

    protected viewport: AbstractCanvasViewport;
    protected canvasPainter: CanvasBasePainter;

    public setViewport(viewport: AbstractCanvasViewport): void {
        this.viewport = viewport;
        this.onViewportInit();
    }

    public onMainStageCreation(): void { }

    public onResize(): void { };

    public getDisplayRect(): TLayerRect {
        return this.viewport.getDisplayLayerRect();
    }

    public getCanvasPainter(): CanvasBasePainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CanvasBasePainter();
        }
        return this.canvasPainter;
    }

    protected onViewportInit(): void { };


}