import { ILayer } from './interfaces/ILayer';
import { TRenderLayer } from './structures/TRenderLayer';
import { ILayerHost } from './interfaces/ILayerHost';
import { TPosAndDim } from './structures/TPosAndDim';

export abstract class AbstractCanvasBaseLayer implements ILayer {

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

    public layerHost: ILayerHost;

    constructor(layerHost: ILayerHost, layerParams: TRenderLayer) {
        this.layerHost = layerHost;
        this.initializeParameters(layerParams);
        this.createDrawBufferCanvas();
    }

    public render(context: CanvasRenderingContext2D): void {
        this.drawImage(context);
    }

    public onResize(): void {
        this.updateLayerDimensions();
        this.renderSelf();
    }

    protected updateLayerDimensions(): void {
        const layerPosAndDim: TPosAndDim = this.layerHost.getSubLayerRelativePosAndDim(this);
        this.layer.height = layerPosAndDim.height;
        this.layer.width = layerPosAndDim.width;
        this.layerHeight = layerPosAndDim.height;
        this.layerWidth = layerPosAndDim.width;
        this.dX = layerPosAndDim.dX;
        this.dY = layerPosAndDim.dY;
        this.sWidth = layerPosAndDim.width;
        this.sHeight = layerPosAndDim.height;
        this.dWidth = layerPosAndDim.width;
        this.dHeight = layerPosAndDim.height;
    }

    protected abstract renderSelf(): void;

    private initializeParameters(layerParameters: TRenderLayer): void {
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