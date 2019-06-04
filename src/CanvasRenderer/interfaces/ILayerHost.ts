import { TLayerRect } from "../structures/TLayerRect";

export interface ILayerHost {
    notifyRenderChanges(): void;
    getLayerDestinationRect(): TLayerRect;
}