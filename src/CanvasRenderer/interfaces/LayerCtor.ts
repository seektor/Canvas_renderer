import { ILayerHost } from './ILayerHost';
import { AbstractCanvasStage } from '../AbstractCanvasStage';
import { TLayer } from '../structures/TLayer';
import { AbstractCanvasModel } from '../AbstractCanvasModel';

export interface LayerCtor<T extends AbstractCanvasStage, U extends AbstractCanvasModel> {
    (layerHost: ILayerHost, model: U, params: TLayer): T;
}