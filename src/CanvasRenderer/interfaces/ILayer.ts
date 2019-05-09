import { LayerType } from "../structures/LayerType";
import { TCoords } from "../structures/TCoords";
import { TLayerCoords } from "../structures/TLayerCoords";
import { TDeltas } from "../structures/TDeltas";

export interface ILayer {
    readonly type: LayerType;
    render(context: CanvasRenderingContext2D): void;
    onResize();
    getParentRelativeCoords(): TLayerCoords;
    isPierced(coords: TCoords): boolean;

    onActionEnter(coords: TCoords): void;
    onActionStart(coords: TCoords): void;
    onActionMove(coords: TCoords): void;
    onActionDrag(deltas: TDeltas): void;
    onActionEnd(coords: TCoords): void;
    onActionOut(): void;
}