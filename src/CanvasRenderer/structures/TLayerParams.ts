import { ILayerHost } from "../interfaces/ILayerHost";
import { ILayerViewport } from "../interfaces/ILayerViewport";
import { AbstractCanvasModel } from "../AbstractCanvasModel";
import { ILayerParamsExtractor } from "../interfaces/ILayerParamsExtractor";

export interface TLayerParams<T extends AbstractCanvasModel, U> {
    layerHost: ILayerHost;
    globalViewport: ILayerViewport;
    model: T;
    layerParamsExtractor: ILayerParamsExtractor;
    config?: U
}