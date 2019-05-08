import { LayerType } from "../structures/LayerType";
import { TCoords } from "../structures/TCoords";
import { TLayerCoords } from "../structures/TLayerCoords";

export interface ILayer {
    readonly type: LayerType;
    render(context: CanvasRenderingContext2D): void;
    onResize();
    getParentRelativeCoords(): TLayerCoords;
    isPierced(coords: TCoords): boolean;

    onActionEnter(coords: TCoords): void;
    onActionStart(coords: TCoords): void;
    onActionMove(coords: TCoords): void;
    onActionEnd(coords: TCoords): void;
    onActionOut(): void;
}