import { CanvasStage } from "./CanvasStage";
import { ILayer } from "./interfaces/ILayer";
import { TDimensions } from "./structures/TDimensions";
import { AbstractCanvasComponent } from "./AbstractCanvasComponent";
import { TViewportParams } from "./structures/TViewportParams";

export abstract class AbstractCanvasViewport {

    protected container: HTMLElement;
    protected subComponents: AbstractCanvasComponent[];
    private mainStage: CanvasStage;

    constructor(params: TViewportParams) {
        this.container = params.container;
        this.subComponents = [];
        this.renderStage = params && params.stageParams ? () => void 0 : this.renderStage;
        this.mainStage = new CanvasStage(params.container, params.stageParams);
    }

    protected abstract createLayers(): void;

    protected addLayer(...layers: ILayer[]) {
        this.mainStage.addLayer(...layers);
    }

    protected getStageDimensions(): TDimensions {
        return this.mainStage.getDisplayDimensions();
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

}