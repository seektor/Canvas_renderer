import { TCoords } from "../structures/TCoords";
import { TRect } from "../structures/TRect";

export interface ILayerHost {
    notifyRenderChanges(): void;
    getLayerDisplayRect(): TRect;
}