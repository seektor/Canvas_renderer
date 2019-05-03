import { ILayer } from "./ILayer";
import { TLayerRelativePosition } from "../structures/TLayerRelativePosition";

export interface ILayerHost {
    getSubLayerRelativePosition(subLayer: ILayer): TLayerRelativePosition;
}