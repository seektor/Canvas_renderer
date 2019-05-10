import { TLayerCoords, TParentRelativeCoords, TMainViewportRelativeCoords } from "./TLayerCoords";
import { ILayer } from "../interfaces/ILayer";
import { TCoords } from "./TCoords";

export interface TLayerPlacement extends TCoords {
    layer: ILayer;
}

export interface TParentRelativeLayerPlacement extends TLayerPlacement, TParentRelativeCoords { }

export interface TMainViewportLayerPlacement extends TLayerPlacement, TMainViewportRelativeCoords { }