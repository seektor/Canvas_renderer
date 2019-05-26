import { LayerType } from "../structures/LayerType";
import { TCoords } from "../structures/TCoords";
import { TDeltas } from "../structures/TDeltas";
import { TLayerCoords } from "../structures/TLayerCoords";

export interface ILayer {
    readonly type: LayerType;
    render(context: CanvasRenderingContext2D): void;
    rerenderSelf();
    onResize();
    getParentRelativeCoords(): TLayerCoords;
    isVisible(): boolean;
    isPierced(coords: TCoords): boolean;
    setVisibility(isVisible: boolean): void;

    onActionEnter(coords: TCoords): void;
    onActionStart(coords: TCoords): void;
    onActionMove(coords: TCoords): void;
    onActionDrag(deltas: TDeltas): void;
    onActionEnd(coords: TCoords): void;
    onActionLeave(): void;
}