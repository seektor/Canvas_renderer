import { ILayer } from "./ILayer";
import { TPosAndDim } from "../structures/TPosAndDim";

export interface ILayerPosAndDimExtractor {
    (layer: ILayer): TPosAndDim;
}