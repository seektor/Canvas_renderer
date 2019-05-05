import { ILayerHost } from "./ILayerHost";

export interface ILayer {
    render(context: CanvasRenderingContext2D): void;
    onResize();
}