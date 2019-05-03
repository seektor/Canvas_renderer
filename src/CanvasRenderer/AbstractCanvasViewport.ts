import { AbstractCanvasStage } from "./AbstractCanvasStage";
import { ILayer } from "./interfaces/ILayer";
import { TDimensions } from "./structures/TDimensions";
import { Utils } from "./utils/Utils";
import { TViewportParams } from "./structures/TViewportParams";
import { ILayerHost } from "./interfaces/ILayerHost";
import { TStageParams } from "./structures/TStageParams";
import { TPosAndDim } from "./structures/TPosAndDim";
import { ILayerPosAndDimExtractor } from "./interfaces/ILayerPosAndDimExtractor";

export abstract class AbstractCanvasViewport implements ILayerHost {

    protected container: HTMLElement;
    private displayCanvas: HTMLCanvasElement;
    private displayCanvasContext: CanvasRenderingContext2D;

    protected isHosted: boolean;
    protected abstract mainStage: AbstractCanvasStage;
    private mainStagePosAndDimExtractor: ILayerPosAndDimExtractor;

    constructor(params: TViewportParams) {
        this.container = params.container;
        this.construct(params.container, params.stageParams);
    }

    private construct(container: HTMLElement, params?: TStageParams) {
        if (params) {
            this.isHosted = true;
            this.mainStagePosAndDimExtractor = params.layerPosAndDimExtractor;
            this.displayCanvas = params.displayCanvas;
            this.displayCanvasContext = this.displayCanvas.getContext('2d');
        } else {
            this.isHosted = false;
            const containerDimensions: TDimensions = this.getContainerDimensions();
            this.mainStagePosAndDimExtractor = (layer: ILayer) => ({ dX: 0, dY: 0, ...this.getContainerDimensions() });
            this.createDisplayCanvas(containerDimensions);
            container.appendChild(this.displayCanvas);
        }
    }

    protected getContainerDimensions(): TDimensions {
        return Utils.getElementDimensions(this.container);
    }

    protected getMainStagePosAndDim(): TPosAndDim {
        return this.mainStagePosAndDimExtractor(this.mainStage);
    }

    private createDisplayCanvas(dimensions: TDimensions) {
        const displayCanvas: HTMLCanvasElement = document.createElement(`canvas`);
        displayCanvas.width = dimensions.width;
        displayCanvas.height = dimensions.height;
        displayCanvas.style.display = `block`;
        this.displayCanvasContext = displayCanvas.getContext(`2d`);
        this.displayCanvas = displayCanvas;
    }

    public getSubLayerRelativePosAndDim(subLayer: ILayer): TPosAndDim {
        return this.mainStagePosAndDimExtractor(subLayer);
    }

    protected renderMainStage() {
        this.mainStage.render(this.displayCanvasContext);
    }

    protected onResize() {
        const containerDimensions: TDimensions = this.getContainerDimensions();
        this.displayCanvas.width = containerDimensions.width;
        this.displayCanvas.height = containerDimensions.height;
        this.mainStage.onResize();
        this.renderMainStage();
    }

    public getDisplayCanvas(): HTMLCanvasElement {
        return this.displayCanvas;
    }

    public getContainerElement(): HTMLElement {
        return this.container;
    }

    public getMainStage(): AbstractCanvasStage {
        return this.mainStage;
    }

}