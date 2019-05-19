import { TMainViewportLayerPlacement, TParentRelativeLayerPlacement } from "./TLayerPlacement";

export interface TCanvasViewportEventsData {
    displayOffsetLeft: number;
    displayOffsetTop: number;
    topActiveLayerPlacement: TParentRelativeLayerPlacement;
    actionStartLayer: TMainViewportLayerPlacement | null;
}