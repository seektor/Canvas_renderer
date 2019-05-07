import { TRect } from './TRect';
import { LayerRelativity } from './LayerRelativity';

export interface TLayerRect extends TRect {
    relativity?: LayerRelativity;
}