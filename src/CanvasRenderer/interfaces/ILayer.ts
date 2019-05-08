import { LayerType } from "../structures/LayerType";
import { TCoords } from "../structures/TCoords";
import { TLayerCoords } from "../structures/TLayerCoords";

export interface ILayer {
    readonly type: LayerType;
    render(context: CanvasRenderingContext2D): void;
    onResize();
    getParentRelativeTranslations(): TLayerCoords;
    isPierced(coords: TCoords): boolean;
}