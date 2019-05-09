import { AbstractCanvasStage } from '../AbstractCanvasStage';
import { AbstractCanvasModel } from '../AbstractCanvasModel';
import { TLayerParams } from '../structures/TLayerParams';

export interface LayerCtor<T extends AbstractCanvasStage, U extends AbstractCanvasModel, P> {
    (params: TLayerParams<U, P>): T;
}