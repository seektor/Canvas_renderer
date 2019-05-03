import { AbstractCanvasStage } from './AbstractCanvasStage';
import { ILayer } from './interfaces/ILayer';
import { TDimensions } from './structures/TDimensions';
import { Utils } from './utils/Utils';
import { TViewportParams } from './structures/TViewportParams';
import { ILayerHost } from './interfaces/ILayerHost';
import { TStageParams } from './structures/TStageParams';
import { TPosAndDim } from './structures/TPosAndDim';
import { ILayerPosAndDimExtractor } from './interfaces/ILayerPosAndDimExtractor';
import { PointerEventHandler } from './utils/pointer-event-handler/PointerEventHandler';

export abstract class AbstractCanvasViewport implements ILayerHost {

    protected container: HTMLElement;

    protected isHosted: boolean;
    protected abstract mainStage: AbstractCanvasStage;
    private displayCanvas: HTMLCanvasElement;
    private displayCanvasContext: CanvasRenderingContext2D;
    private mainStagePosAndDimExtractor: ILayerPosAndDimExtractor;
    private pointerEventHandler: PointerEventHandler;

    constructor(params: TViewportParams) {
        this.container = params.container;
        this.pointerEventHandler = new PointerEventHandler();
        this.construct(params.container, params.stageParams);
        this.setBaseEvents();
    }

    public getSubLayerRelativePosAndDim(subLayer: ILayer): TPosAndDim {
        return this.mainStagePosAndDimExtractor(subLayer);
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

    protected getContainerDimensions(): TDimensions {
        return Utils.getElementDimensions(this.container);
    }

    protected getMainStagePosAndDim(): TPosAndDim {
        return this.mainStagePosAndDimExtractor(this.mainStage);
    }

    protected renderMainStage(): void {
        this.mainStage.render(this.displayCanvasContext);
    }

    protected onResize(): void {
        const containerDimensions: TDimensions = this.getContainerDimensions();
        this.displayCanvas.width = containerDimensions.width;
        this.displayCanvas.height = containerDimensions.height;
        this.mainStage.onResize();
        this.renderMainStage();
    }

    private construct(container: HTMLElement, params?: TStageParams): void {
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

    private createDisplayCanvas(dimensions: TDimensions): void {
        const displayCanvas: HTMLCanvasElement = document.createElement(`canvas`);
        displayCanvas.width = dimensions.width;
        displayCanvas.height = dimensions.height;
        displayCanvas.style.display = `block`;
        this.displayCanvasContext = displayCanvas.getContext(`2d`);
        this.displayCanvas = displayCanvas;
    }

    private setBaseEvents(): void {

    }

}