import { AbstractCanvasViewport } from './AbstractCanvasViewport';
import { TLayerRect } from './structures/TLayerRect';

export abstract class AbstractCanvasModel {

    protected viewport: AbstractCanvasViewport;

    public setViewport(viewport: AbstractCanvasViewport): void {
        this.viewport = viewport;
    }

    public getDisplayRect(): TLayerRect {
        return this.viewport.getDisplayLayerRect();
    }

}