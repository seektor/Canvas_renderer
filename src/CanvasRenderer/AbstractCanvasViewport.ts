import { AbstractCanvasStage } from './AbstractCanvasStage';
import { ILayer } from './interfaces/ILayer';
import { TDimensions } from './structures/TDimensions';
import { Utils } from './utils/Utils';
import { TAbstractViewportParams } from './structures/TViewportParams';
import { ILayerHost } from './interfaces/ILayerHost';
import { TStageParams } from './structures/TStageParams';
import { TPosAndDim } from './structures/TPosAndDim';
import { ILayerPosAndDimExtractor } from './interfaces/ILayerPosAndDimExtractor';
import { PointerEventHandler } from './utils/pointer-event-handler/PointerEventHandler';
import { CVerticalSliderMainStage } from '../CanvasComponents/VerticalSlider/layers/CVerticalSliderMainStage';

export abstract class AbstractCanvasViewport implements ILayerHost {

    protected container: HTMLElement;

    protected isHosted: boolean;
    protected mainStage: AbstractCanvasStage;
    private displayCanvas: HTMLCanvasElement;
    private displayCanvasContext: CanvasRenderingContext2D;
    private mainStagePosAndDimExtractor: ILayerPosAndDimExtractor;
    private pointerEventHandler: PointerEventHandler;

    constructor(params: TAbstractViewportParams<AbstractCanvasStage>) {
        this.container = params.container;
        this.pointerEventHandler = new PointerEventHandler();
        this.construct(params);
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

    private construct(params: TAbstractViewportParams<AbstractCanvasStage>): void {
        if (params.stageParams) {
            this.isHosted = true;
            this.mainStagePosAndDimExtractor = () => params.stageParams.layerHost.getSubLayerRelativePosAndDim(this.mainStage);
            this.displayCanvas = params.stageParams.displayCanvas;
            this.displayCanvasContext = this.displayCanvas.getContext('2d');
            this.mainStage = params.mainStageCtor(params.stageParams.layerHost, params.stageParams.layerPosAndDim);
        } else {
            this.isHosted = false;
            const containerDimensions: TDimensions = this.getContainerDimensions();
            this.mainStagePosAndDimExtractor = (layer: ILayer) => ({ dX: 0, dY: 0, ...this.getContainerDimensions() });
            this.createDisplayCanvas(containerDimensions);
            this.mainStage = params.mainStageCtor(this, { ...this.getContainerDimensions() });
            params.container.appendChild(this.displayCanvas);
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