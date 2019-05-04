import { ILayerHost } from "./ILayerHost";

export interface ILayer {
    readonly layerHost: ILayerHost;
    render(context: CanvasRenderingContext2D): void;
    onResize();
}