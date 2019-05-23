import { AbstractCanvasModel } from './AbstractCanvasModel';
import { AbstractCanvasViewport } from './AbstractCanvasViewport';
import { ILayer } from './interfaces/ILayer';
import { ViewportCtor } from './interfaces/ViewportCtor';
import { TLayerHostingParams } from './structures/TLayerHostingParams';

export abstract class AbstractCanvasComponent {

    protected abstract model: AbstractCanvasModel;
    protected abstract viewport: AbstractCanvasViewport;
    private viewportCtor: ViewportCtor<AbstractCanvasViewport, AbstractCanvasModel>;

    constructor(viewportCtor: ViewportCtor<AbstractCanvasViewport, AbstractCanvasModel>) {
        this.viewportCtor = viewportCtor;
    }

    public createViewport(container: HTMLElement, hostingParams?: TLayerHostingParams): void {
        if (this.viewport) {
            console.warn('Viewport already exists.');
            return;
        }
        this.viewport = this.viewportCtor({ container, model: this.model, hostingParams });
    }

    public getMainStage(): ILayer {
        if (!this.viewport) {
            console.warn('Viewport does not exist.');
            return;
        }
        return this.viewport.getMainStage();
    }
}