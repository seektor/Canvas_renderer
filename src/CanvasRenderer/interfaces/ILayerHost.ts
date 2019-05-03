import { ILayer } from "./ILayer";
import { TPosAndDim } from "../structures/TPosAndDim";

export interface ILayerHost {
    getSubLayerRelativePosAndDim(subLayer: ILayer): TPosAndDim;
    getDisplayCanvas(): HTMLCanvasElement;
    getContainerElement(): HTMLElement;
}