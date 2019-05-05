import { ILayerHost } from '../interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../interfaces/ILayerParamsExtractor';

export interface TLayerHostingParams {
    displayCanvas: HTMLCanvasElement;
    layerHost: ILayerHost;
    displayLayerRectExtractor: ILayerParamsExtractor;
}