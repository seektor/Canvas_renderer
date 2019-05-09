import { TCoords } from "./TCoords";
import { LayerRelativity } from "./LayerRelativity";

export interface TLayerCoords extends TCoords {
    relativity?: LayerRelativity;
}

export interface TParentRelativeCoords extends TCoords {
    relativity: LayerRelativity.Parent;
}

export interface TMainViewportRelativeCoords extends TCoords {
    relativity: LayerRelativity.MainViewport;
}