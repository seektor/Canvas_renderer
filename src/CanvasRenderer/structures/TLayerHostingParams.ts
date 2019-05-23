import { AbstractCanvasViewport } from '../AbstractCanvasViewport';
import { ILayerHost } from '../interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../interfaces/ILayerParamsExtractor';

export interface TLayerHostingParams {
    hostingViewport: AbstractCanvasViewport;
    layerHost: ILayerHost;
    displayLayerRectExtractor: ILayerParamsExtractor;
}