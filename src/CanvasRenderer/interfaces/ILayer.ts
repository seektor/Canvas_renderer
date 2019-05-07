import { LayerType } from "../structures/LayerType";
import { TCoords } from "../structures/TCoords";
import { TParentRelativeTranslations } from "../structures/TParentRelativeTranslations";

export interface ILayer {
    readonly type: LayerType;
    render(context: CanvasRenderingContext2D): void;
    onResize();
    getParentRelativeTranslations(): TParentRelativeTranslations;
    isPierced(coords: TCoords): boolean;
}