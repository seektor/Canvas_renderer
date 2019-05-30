import { TMainViewportLayerPlacement, TParentRelativeLayerPlacement } from "./TLayerPlacement";

export interface TCanvasViewportEventsData {
    topActiveLayerPlacement: TParentRelativeLayerPlacement;
    actionStartLayer: TMainViewportLayerPlacement | null;
}