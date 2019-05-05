import { ILayer } from './interfaces/ILayer';
import { TLayer } from './structures/TLayer';
import { ILayerHost } from './interfaces/ILayerHost';
import { AbstractCanvasModel } from './AbstractCanvasModel';

export abstract class AbstractCanvasLayer implements ILayer {

    protected layer: HTMLCanvasElement;
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

    protected model: AbstractCanvasModel;
    public layerHost: ILayerHost;


    constructor(layerHost: ILayerHost, model: AbstractCanvasModel, params: TLayer) {
        this.layerHost = layerHost;
        this.model = model;
        this.initializeParameters(params);
        this.createDrawBufferCanvas();
    }

    public render(context: CanvasRenderingContext2D): void {
        this.drawImage(context);
    }

    public onResize(): void {

    }

    protected updateLayer(params: TLayer, fitToView: boolean): void {
        this.layer.height = params.height;
        this.layer.width = params.width;
        this.layerHeight = params.height;
        this.layerWidth = params.width;
        this.dX = params.dX;
        this.dY = params.dY;
        if (fitToView) {
            this.sX = params.sX || 0;
            this.sY = params.sY || 0;
            this.sWidth = params.sWidth || params.width;
            this.sHeight = params.sHeight || params.height;
            this.dWidth = params.dWidth || params.width;
            this.dHeight = params.dHeight || params.height;
        } else {
            this.sX = params.sX || this.sX;
            this.sY = params.sY || this.sY;
            this.sWidth = params.sWidth || this.sWidth;
            this.sHeight = params.sHeight || this.sHeight;
            this.dWidth = params.dWidth || this.dWidth;
            this.dHeight = params.dHeight || this.dHeight;
        }
    }

    protected abstract renderSelf(): void;

    private initializeParameters(layerParameters: TLayer): void {
        this.layerWidth = layerParameters.width;
        this.layerHeight = layerParameters.height;
        this.dX = layerParameters.dX || 0;
        this.dY = layerParameters.dY || 0;
        this.dHeight = layerParameters.dHeight || layerParameters.height;
        this.dWidth = layerParameters.dWidth || layerParameters.width;
        this.sX = layerParameters.sX || 0;
        this.sY = layerParameters.sY || 0;
        this.sHeight = layerParameters.sHeight || layerParameters.height;
        this.sWidth = layerParameters.sWidth || layerParameters.width;
    }

    private createDrawBufferCanvas(): void {
        const drawBufferCanvas: HTMLCanvasElement = document.createElement(`canvas`);
        drawBufferCanvas.width = this.layerWidth;
        drawBufferCanvas.height = this.layerHeight;
        drawBufferCanvas.style.display = `block`;
        this.layerContext = drawBufferCanvas.getContext(`2d`);
        this.layer = drawBufferCanvas;
    }

    private drawImage(context: CanvasRenderingContext2D): void {
        context.drawImage(this.layer, this.sX, this.sY, this.sWidth, this.sHeight, this.dX, this.dY, this.dWidth, this.dHeight);
    }

}