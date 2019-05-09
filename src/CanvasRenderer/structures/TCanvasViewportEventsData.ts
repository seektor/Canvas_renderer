import { TParentRelativeLayerPlacement, TMainViewportLayerPlacement } from "./TLayerPlacement";

export interface TCanvasViewportEventsData {
    displayOffsetLeft: number;
    displayOffsetTop: number;
    topActiveLayerPlacement: TParentRelativeLayerPlacement;
    actionStartLayer: TMainViewportLayerPlacement;
}