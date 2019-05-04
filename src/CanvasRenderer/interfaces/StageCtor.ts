import { ILayerHost } from './ILayerHost';
import { AbstractCanvasStage } from '../AbstractCanvasStage';
import { TRenderLayer } from '../structures/TRenderLayer';

export interface StageCtor<T extends AbstractCanvasStage> {
    (layerHost: ILayerHost, params: TRenderLayer): T;
}