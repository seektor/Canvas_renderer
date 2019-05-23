import { AbstractCanvasModel } from "../AbstractCanvasModel";
import { AbstractCanvasViewport } from "../AbstractCanvasViewport";
import { ILayerHost } from "../interfaces/ILayerHost";
import { ILayerParamsExtractor } from "../interfaces/ILayerParamsExtractor";

export interface TLayerParams<MODEL extends AbstractCanvasModel, VIEWPORT extends AbstractCanvasViewport, CONFIG> {
    layerHost: ILayerHost;
    model: MODEL;
    viewport: VIEWPORT;
    layerParamsExtractor: ILayerParamsExtractor;
    config?: CONFIG
}