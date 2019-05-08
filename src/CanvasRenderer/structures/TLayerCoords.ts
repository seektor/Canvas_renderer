import { TCoords } from "./TCoords";
import { LayerRelativity } from "./LayerRelativity";

export interface TLayerCoords extends TCoords {
    relativity?: LayerRelativity;
}