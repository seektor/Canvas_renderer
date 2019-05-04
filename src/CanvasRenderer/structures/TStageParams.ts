import { ILayerPosAndDimExtractor } from "../interfaces/ILayerPosAndDimExtractor";
import { ILayerHost } from "../interfaces/ILayerHost";
import { TPosAndDim } from "./TPosAndDim";

export interface TStageParams {
    displayCanvas: HTMLCanvasElement;
    layerHost: ILayerHost;
    layerPosAndDim: TPosAndDim;
}