import { ILayerHost } from './ILayerHost';
import { AbstractCanvasStage } from '../AbstractCanvasStage';
import { AbstractCanvasModel } from '../AbstractCanvasModel';
import { ILayerParamsExtractor } from './ILayerParamsExtractor';
import { ILayerViewport } from './ILayerViewport';

export interface LayerCtor<T extends AbstractCanvasStage, U extends AbstractCanvasModel> {
    (layerHost: ILayerHost, globalViewport: ILayerViewport, model: U, params: ILayerParamsExtractor): T;
}