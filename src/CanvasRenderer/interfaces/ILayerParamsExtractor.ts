import { ILayer } from './ILayer';
import { TLayerRenderParams } from '../structures/TLayerRenderParams';

export interface ILayerParamsExtractor {
    (layer: ILayer | undefined): TLayerRenderParams;
}