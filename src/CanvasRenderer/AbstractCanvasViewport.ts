import { AbstractCanvasStage } from './AbstractCanvasStage';
import { TDimensions } from './structures/TDimensions';
import { Utils } from './utils/Utils';
import { TAbstractViewportParams } from './structures/TViewportParams';
import { ILayerHost } from './interfaces/ILayerHost';
import { PointerEventHandler } from './utils/pointer-event-handler/PointerEventHandler';
import { AbstractCanvasModel } from './AbstractCanvasModel';
import { TLayerRect } from './structures/TLayerRect';
import { ILayerRectExtractor } from './interfaces/ILayerRectExtractor';

export abstract class AbstractCanvasViewport implements ILayerHost {

    protected container: HTMLElement;
    protected model: AbstractCanvasModel;

    protected isHosted: boolean;
    protected mainStage: AbstractCanvasStage;
    private displayCanvas: HTMLCanvasElement;
    private displayCanvasContext: CanvasRenderingContext2D;
    private displayLayerRectExtractor: ILayerRectExtractor;
    private pointerEventHandler: PointerEventHandler;

    constructor(params: TAbstractViewportParams<AbstractCanvasStage, AbstractCanvasModel>) {
        this.container = params.container;
        this.model = params.model;
        this.model.setViewport(this);
        this.pointerEventHandler = new PointerEventHandler();
        this.construct(params);
        this.setBaseEvents();
    }

    public getMainStage(): AbstractCanvasStage {
        return this.mainStage;
    }

    public getDisplayLayerRect(): TLayerRect {
        return this.displayLayerRectExtractor();
    }

    protected getContainerDimensions(): TDimensions {
        return Utils.getElementDimensions(this.container);
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

    private construct(params: TAbstractViewportParams<AbstractCanvasStage, AbstractCanvasModel>): void {
        if (params.hostingParams) {
            this.isHosted = true;
            this.displayLayerRectExtractor = params.hostingParams.displayLayerRectExtractor;
            this.displayCanvas = params.hostingParams.displayCanvas;
            this.displayCanvasContext = this.displayCanvas.getContext('2d');
            this.mainStage = params.mainStageCtor(params.hostingParams.layerHost, params.model, params.hostingParams.displayLayerRectExtractor());
        } else {
            this.isHosted = false;
            const containerDimensions: TDimensions = this.getContainerDimensions();
            this.displayLayerRectExtractor = () => ({ dX: 0, dY: 0, ...this.getContainerDimensions() });
            this.createDisplayCanvas(containerDimensions);
            this.mainStage = params.mainStageCtor(this, this.model, this.displayLayerRectExtractor());
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