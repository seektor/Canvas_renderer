import { AbstractCanvasModel } from '../AbstractCanvasModel';
import { AbstractCanvasStage } from '../AbstractCanvasStage';
import { AbstractCanvasViewport } from '../AbstractCanvasViewport';
import { TLayerParams } from '../structures/TLayerParams';

export interface LayerCtor<STAGE extends AbstractCanvasStage, MODEL extends AbstractCanvasModel, VIEWPORT extends AbstractCanvasViewport, CONFIG> {
    (params: TLayerParams<MODEL, VIEWPORT, CONFIG>): STAGE;
}