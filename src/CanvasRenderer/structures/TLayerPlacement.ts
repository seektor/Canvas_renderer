import { TLayerCoords } from "./TLayerCoords";
import { ILayer } from "../interfaces/ILayer";

export interface TLayerPlacement extends TLayerCoords {
    layer: ILayer;
}