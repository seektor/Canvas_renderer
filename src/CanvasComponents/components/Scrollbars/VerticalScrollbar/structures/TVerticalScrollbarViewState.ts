import { TLayerRect } from '../../../../../CanvasRenderer/structures/TLayerRect';

export interface TVerticalScrollbarViewState {
    scrollbarRect: TLayerRect;
    topButtonRect: TLayerRect;
    bottomButtonRect: TLayerRect;
    trackRect: TLayerRect;
    handleRect: TLayerRect;
}