import { CanvasStage } from "./CanvasStage";
import { ILayer } from "./interfaces/ILayer";
import { TDimensions } from "./structures/TDimensions";
import { TViewportParams } from "./structures/TViewportParams";
import { TStageParams } from "./structures/TStageParams";
import { AbstractCanvasComponent } from "./AbstractCanvasComponent";

export abstract class AbstractCanvasViewport {

    protected container: HTMLElement;
    protected subComponents: AbstractCanvasComponent[];
    private mainStage: CanvasStage;

    constructor(container: HTMLElement, params: TViewportParams | null) {
        this.container = container;
        this.subComponents = [];
        const stageParams: TStageParams | undefined = params && params.stageParams;
        this.renderStage = params && params.stageParams ? () => void 0 : this.renderStage;
        this.mainStage = new CanvasStage(container, stageParams);
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