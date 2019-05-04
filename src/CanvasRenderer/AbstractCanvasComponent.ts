import { AbstractCanvasModel } from './AbstractCanvasModel';
import { AbstractCanvasViewport } from './AbstractCanvasViewport';
import { ViewportCtor } from './interfaces/ViewportCtor';
import { TAbstractViewportParams, TViewportParams } from './structures/TViewportParams';
import { ILayer } from './interfaces/ILayer';

export abstract class AbstractCanvasComponent {

    protected abstract model: AbstractCanvasModel;
    protected abstract viewport: AbstractCanvasViewport;
    private viewportCtor: ViewportCtor<AbstractCanvasViewport>;

    constructor(viewportCtor: ViewportCtor<AbstractCanvasViewport>) {
        this.viewportCtor = viewportCtor;
    }

    public createViewport(params: TViewportParams): void {
        if (this.viewport) {
            console.warn('Viewport already exists.');
            return;
        }
        this.viewport = this.viewportCtor(params);
    }

    public getMainStage(): ILayer {
        if (!this.viewport) {
            console.warn('Viewport does not exist.');
            return;
        }
        return this.viewport.getMainStage();
    }
}