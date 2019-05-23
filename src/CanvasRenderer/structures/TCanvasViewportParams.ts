import { AbstractCanvasModel } from '../AbstractCanvasModel';
import { AbstractCanvasStage } from '../AbstractCanvasStage';
import { AbstractCanvasViewport } from '../AbstractCanvasViewport';
import { LayerCtor } from '../interfaces/LayerCtor';
import { TLayerHostingParams } from './TLayerHostingParams';

export interface TCanvasViewportParams<MODEL extends AbstractCanvasModel> {
    container: HTMLElement;
    model: MODEL;
    hostingParams?: TLayerHostingParams;
}

export interface TAbstractCanvasViewportParams<STAGE extends AbstractCanvasStage, VIEWPORT extends AbstractCanvasViewport, MODEL extends AbstractCanvasModel> extends TCanvasViewportParams<MODEL> {
    mainStageCtor: LayerCtor<STAGE, MODEL, VIEWPORT, null>;
}