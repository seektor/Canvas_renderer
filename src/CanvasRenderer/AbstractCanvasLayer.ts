import { ILayer } from './interfaces/ILayer';
import { TLayerParams } from './structures/TLayerParams';
import { ILayerHost } from './interfaces/ILayerHost';
import { AbstractCanvasModel } from './AbstractCanvasModel';
import { ILayerParamsExtractor } from './interfaces/ILayerParamsExtractor';
import { TRect } from './structures/TRect';
import { LayerType } from './structures/LayerType';
import { TCoords } from './structures/TCoords';
import { TLayerCoords } from './structures/TLayerCoords';
import { ILayerViewport } from './interfaces/ILayerViewport';

export abstract class AbstractCanvasLayer implements ILayer {

    public readonly type: LayerType = LayerType.Base;

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
    protected model: AbstractCanvasModel;
    protected globalViewport: ILayerViewport;
    protected layerParamsExtractor: ILayerParamsExtractor;

    constructor(layerHost: ILayerHost, globalViewport: ILayerViewport, model: AbstractCanvasModel, layerParamsExtractor: ILayerParamsExtractor) {
        this.layerHost = layerHost;
        this.globalViewport = globalViewport;
        this.model = model;
        this.layerParamsExtractor = layerParamsExtractor;
        this.initializeParameters(layerParamsExtractor);
        this.createDrawBufferCanvas();
    }

    public render(context: CanvasRenderingContext2D): void {
        this.drawImage(context);
    }

    public onResize(): void {
        const layerParams: TLayerParams = this.layerParamsExtractor(this);
        this.updateLayer(layerParams, true);
        this.renderSelf();
    }

    public getParentRelativeCoords(): TLayerCoords {
        return { x: this.dX, y: this.dY };
    }

    protected updateLayer(params: TLayerParams, fitToView: boolean): void {
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

    protected abstract renderSelf(...params: unknown[]): void;

    private initializeParameters(paramsExtractor: ILayerParamsExtractor): void {
        const layerParams: TLayerParams = paramsExtractor(this);
        this.layerWidth = layerParams.width;
        this.layerHeight = layerParams.height;
        this.dX = layerParams.dX || 0;
        this.dY = layerParams.dY || 0;
        this.dHeight = layerParams.dHeight || layerParams.height;
        this.dWidth = layerParams.dWidth || layerParams.width;
        this.sX = layerParams.sX || 0;
        this.sY = layerParams.sY || 0;
        this.sHeight = layerParams.sHeight || layerParams.height;
        this.sWidth = layerParams.sWidth || layerParams.width;
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

    protected getLayerRect(): TRect {
        return {
            height: this.layerHeight,
            width: this.layerWidth,
            x: 0,
            y: 0
        }
    }

    protected getLayerRenderRect(): TRect {
        return {
            height: this.sHeight,
            width: this.sWidth,
            x: this.sX,
            y: this.sY
        }
    }

    private isBetween(value: number, min: number, max: number): boolean {
        return value > min && value <= max;
    }

    public isPierced(coords: TCoords): boolean {
        return this.isBetween(coords.x, this.sX, this.sX + this.sWidth) && this.isBetween(coords.y, this.sY, this.sY + this.sHeight);
    }

    public onActionEnter(coords: TCoords): void {

    };

    public onActionStart(coords: TCoords): void {

    }

    public onActionMove(coords: TCoords): void {

    }

    public onActionEnd(coords: TCoords): void {

    }

    public onActionOut(): void {

    }

}