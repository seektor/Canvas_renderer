import { ILayerHost } from '../interfaces/ILayerHost';
import { ILayerRectExtractor } from '../interfaces/ILayerRectExtractor';

export interface TLayerHostingParams {
    displayCanvas: HTMLCanvasElement;
    layerHost: ILayerHost;
    displayLayerRectExtractor: ILayerRectExtractor;
}