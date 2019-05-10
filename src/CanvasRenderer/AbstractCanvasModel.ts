import { AbstractCanvasViewport } from './AbstractCanvasViewport';
import { TLayerRect } from './structures/TLayerRect';
import { CanvasBasePainter } from './utils/painter/CanvasBasePainter';

export abstract class AbstractCanvasModel {

    protected ownViewport: AbstractCanvasViewport;
    protected canvasPainter: CanvasBasePainter;

    public setViewport(viewport: AbstractCanvasViewport): void {
        this.ownViewport = viewport;
        this.onGlobalViewportInit();
    }

    public onMainStageCreation(): void { }

    public onResize(): void { };

    public getDisplayRect(): TLayerRect {
        return this.ownViewport.getLayerDisplayRect();
    }

    public getCanvasPainter(): CanvasBasePainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CanvasBasePainter();
        }
        return this.canvasPainter;
    }

    protected onGlobalViewportInit(): void { };


}