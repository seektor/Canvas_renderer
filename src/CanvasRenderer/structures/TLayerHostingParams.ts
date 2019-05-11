import { ILayerHost } from '../interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../interfaces/ILayerParamsExtractor';
import { ILayerViewport } from '../interfaces/ILayerViewport';

export interface TLayerHostingParams {
    globalViewport: ILayerViewport;
    layerHost: ILayerHost;
    displayLayerRectExtractor: ILayerParamsExtractor;
}