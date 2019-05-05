import { ILayer } from './ILayer';
import { TLayerParams } from '../structures/TLayerParams';

export interface ILayerParamsExtractor {
    (layer: ILayer | undefined): TLayerParams;
}