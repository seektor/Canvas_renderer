import { ILayerHost } from './ILayerHost';
import { AbstractCanvasStage } from '../AbstractCanvasStage';
import { AbstractCanvasModel } from '../AbstractCanvasModel';
import { ILayerParamsExtractor } from './ILayerParamsExtractor';

export interface LayerCtor<T extends AbstractCanvasStage, U extends AbstractCanvasModel> {
    (layerHost: ILayerHost, model: U, params: ILayerParamsExtractor): T;
}