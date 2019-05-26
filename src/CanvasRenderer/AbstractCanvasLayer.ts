import { AbstractCanvasModel } from './AbstractCanvasModel';
import { AbstractCanvasViewport } from './AbstractCanvasViewport';
import { ILayer } from './interfaces/ILayer';
import { ILayerHost } from './interfaces/ILayerHost';
import { ILayerParamsExtractor } from './interfaces/ILayerParamsExtractor';
import { LayerRelativity } from './structures/LayerRelativity';
import { LayerType } from './structures/LayerType';
import { TCoords } from './structures/TCoords';
import { TDeltas } from './structures/TDeltas';
import { TDimensions } from './structures/TDimensions';
import { TParentRelativeCoords } from './structures/TLayerCoords';
import { TLayerParams } from './structures/TLayerParams';
import { TLayerRect } from './structures/TLayerRect';
import { TLayerRenderParams } from './structures/TLayerRenderParams';
import { TRect } from './structures/TRect';

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
    protected viewport: AbstractCanvasViewport;
    protected layerParamsExtractor: ILayerParamsExtractor;
    protected visible: boolean;

    constructor(params: TLayerParams<AbstractCanvasModel, AbstractCanvasViewport, unknown>) {
        this.layerHost = params.layerHost;
        this.viewport = params.viewport;
        this.model = params.model;
        this.layerParamsExtractor = params.layerParamsExtractor;
        this.initializeParameters(params.layerParamsExtractor);
        this.createDrawBufferCanvas();
    }

    public render(context: CanvasRenderingContext2D): void {
        this.drawImage(context);
    }

    public rerenderSelf(): void {
        this.renderSelf();
    }

    public onResize(): void {
        const layerParams: TLayerRenderParams = this.layerParamsExtractor(this);
        this.updateLayer(layerParams, true);
        this.onLayerDidResize();
        this.renderSelf();
    }

    protected onLayerDidResize(): void { }

    public getParentRelativeCoords(): TParentRelativeCoords {
        return { x: this.dX, y: this.dY, relativity: LayerRelativity.Parent };
    }

    public getLayerContext(): CanvasRenderingContext2D {
        return this.layerContext;
    }

    public setVisibility(isVisible): void {
        this.visible = isVisible;
    }

    protected clear(): void {
        this.layerContext.clearRect(this.sX, this.sY, this.sWidth, this.sHeight);
    }

    protected updateLayer(params: TLayerRenderParams, fitToView: boolean): void {
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
        const layerParams: TLayerRenderParams = paramsExtractor(this);
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
        this.visible = true;
    }

    public isVisible(): boolean {
        return this.visible;
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
        if (this.layerWidth === 0 || this.layerHeight === 0) {
            return;
        }
        context.drawImage(this.layer, this.sX, this.sY, this.sWidth, this.sHeight, this.dX, this.dY, this.dWidth, this.dHeight);
    }

    public getLayerDimensions(): TDimensions {
        return {
            height: this.layerHeight,
            width: this.layerWidth
        }
    }

    public getLayerRect(): TRect {
        return {
            height: this.layerHeight,
            width: this.layerWidth,
            x: 0,
            y: 0
        }
    }

    public getLayerDisplayRect(): TLayerRect {
        return {
            height: this.layerHeight,
            width: this.layerWidth,
            x: this.dX,
            y: this.dY,
            relativity: LayerRelativity.Parent
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

    protected isBetween(value: number, min: number, max: number): boolean {
        return value > min && value <= max;
    }

    protected notifyRenderChanges(): void {
        this.layerHost.notifyRenderChanges();
    }

    protected fillContent(color: string): void {
        const initialColor: string = this.layerContext.fillStyle as string;
        this.layerContext.fillStyle = color;
        this.layerContext.fillRect(0, 0, this.layerWidth, this.layerHeight);
        this.layerContext.fillStyle = initialColor;
    }

    public isPierced(coords: TCoords): boolean {
        return this.isBetween(coords.x, this.sX, this.sX + this.sWidth) && this.isBetween(coords.y, this.sY, this.sY + this.sHeight);
    }

    public onActionEnter(coords: TCoords): void { };

    public onActionStart(coords: TCoords): void { }

    public onActionMove(coords: TCoords): void { }

    public onActionDrag(deltas: TDeltas): void { }

    public onActionEnd(coords: TCoords): void { }

    public onActionLeave(): void { }

}