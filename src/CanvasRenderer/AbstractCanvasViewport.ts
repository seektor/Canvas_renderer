import { CanvasStage } from "./CanvasStage";
import { ILayer } from "./interfaces/ILayer";
import { TDimensions } from "./structures/TDimensions";
import { AbstractCanvasComponent } from "./AbstractCanvasComponent";
import { Utils } from "./utils/Utils";
import { TViewportParams } from "./structures/TViewportParams";
import { TLayerRelativePosition } from "./structures/TLayerRelativePosition";
import { ILayerHost } from "./interfaces/ILayerHost";

export abstract class AbstractCanvasViewport implements ILayerHost {

    protected container: HTMLElement;
    protected subComponents: AbstractCanvasComponent[];
    protected isHosted: boolean;
    private mainStage: CanvasStage;

    constructor(params: TViewportParams) {
        this.container = params.container;
        this.subComponents = [];
        this.isHosted = !!params.stageParams;
        this.renderStage = params.stageParams ? Utils.noop : this.renderStage;
        this.mainStage = new CanvasStage(params.container, this, params.stageParams);
    }

    protected abstract createLayers(): void;

    protected addLayer(...layers: ILayer[]) {
        this.mainStage.addLayer(...layers);
    }

    protected getStageDimensions(): TDimensions {
        return this.mainStage.getDisplayDimensions();
    }

    protected getContainerDimensions(): TDimensions {
        return Utils.getElementDimensions(this.container);
    }

    protected renderStage(): void {
        this.mainStage.renderStage();
    }

    protected getDisplayCanvas(): HTMLCanvasElement {
        return this.mainStage.getDisplayCanvas();
    }

    public getMainStage(): ILayer {
        return this.mainStage;
    }

    public onResize(): void {
        this.mainStage.onResize();
    }

    public abstract getSubLayerRelativePosition(subLayer: ILayer): TLayerRelativePosition

}