import { AbstractCanvasModel } from './AbstractCanvasModel';
import { AbstractCanvasViewport } from './AbstractCanvasViewport';
import { ILayer } from './interfaces/ILayer';
import { TLayerHostingParams } from './structures/TLayerHostingParams';

export abstract class AbstractCanvasComponent {

    protected abstract model: AbstractCanvasModel;
    protected abstract viewport: AbstractCanvasViewport;

    constructor() { }

    public initViewport(container: HTMLElement, hostingParams: TLayerHostingParams | undefined): void {
        this.viewport.initViewport(container, hostingParams);
    }

    public getMainStage(): ILayer {
        return this.viewport.getMainStage();
    }
}