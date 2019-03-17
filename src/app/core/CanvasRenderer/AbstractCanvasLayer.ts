import { TLayer } from "./structures/TLayer";

export abstract class AbstractCanvasLayer {

    protected layerElement: HTMLCanvasElement;
    protected layerContext: CanvasRenderingContext2D;
    protected layerWidth: number;
    protected layerHeight: number;
    // Source data
    protected sX: number;
    protected sY: number;
    protected sWidth: number;
    protected sHeight: number;
    // Destination data
    protected dX: number;
    protected dY: number;
    protected dWidth: number;
    protected dHeight: number;

    constructor(layerParameters: TLayer) {
        this.initializeParameters(layerParameters);
        this.createPlaneDC(layerParameters.layerWidth, layerParameters.layerHeight);
    }

    private initializeParameters(layerParameters: TLayer) {
        this.layerWidth = layerParameters.layerWidth;
        this.layerHeight = layerParameters.layerHeight;
        this.dX = layerParameters.dX || 0;
        this.dY = layerParameters.dY || 0;
    }

    private createPlaneDC(layerWidth: number, layerHeight: number) {
        this.layerElement = document.createElement(`canvas`);
        this.layerElement.width = layerWidth;
        this.layerElement.height = layerHeight;
        this.layerContext = this.layerElement.getContext(`2d`);
    }

    public drawOn(context: CanvasRenderingContext2D) {
        context.drawImage(this.layerElement, this.dX, this.dY);
    }

    protected abstract render();

}