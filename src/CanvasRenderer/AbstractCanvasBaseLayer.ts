import { ILayer } from "./interfaces/ILayer";
import { TRenderLayer } from "./structures/TRenderLayer";
import { ILayerHost } from "./interfaces/ILayerHost";
import { TLayerRelativePosition } from "./structures/TLayerRelativePosition";

export abstract class AbstractCanvasBaseLayer implements ILayer {

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

    protected layerHost: ILayerHost;

    constructor(layerHost: ILayerHost, layerParams: TRenderLayer) {
        this.layerHost = layerHost;
        this.initializeParameters(layerParams);
        this.createPlaneDC(layerParams.width, layerParams.height);
    }

    private initializeParameters(layerParameters: TRenderLayer) {
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

    private createPlaneDC(layerWidth: number, layerHeight: number) {
        this.layerElement = document.createElement(`canvas`);
        this.layerElement.width = layerWidth;
        this.layerElement.height = layerHeight;
        this.layerContext = this.layerElement.getContext(`2d`);
    }

    public render(context: CanvasRenderingContext2D) {
        this.drawImage(context);
    }

    private drawImage(context: CanvasRenderingContext2D) {
        context.drawImage(this.layerElement, this.sX, this.sY, this.sWidth, this.sHeight, this.dX, this.dY, this.dWidth, this.dHeight);
    }

    public onResize() {
        const layerRelativePosition: TLayerRelativePosition = this.layerHost.getSubLayerRelativePosition(this);
        this.layerHeight = layerRelativePosition.height;
        this.layerWidth = layerRelativePosition.width;
        this.dX = layerRelativePosition.dX;
        this.dY = layerRelativePosition.dY;
        this.renderSelf();
    }

    protected abstract renderSelf();

}