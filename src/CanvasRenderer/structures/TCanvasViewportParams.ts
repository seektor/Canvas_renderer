import { AbstractCanvasModel } from '../AbstractCanvasModel';
import { TLayerHostingParams } from './TLayerHostingParams';
import { LayerCtor } from '../interfaces/LayerCtor';
import { AbstractCanvasStage } from '../AbstractCanvasStage';

export interface TCanvasViewportParams<T extends AbstractCanvasModel> {
    container: HTMLElement;
    model: T;
    hostingParams?: TLayerHostingParams;
}

export interface TAbstractCanvasViewportParams<T extends AbstractCanvasStage, U extends AbstractCanvasModel> extends TCanvasViewportParams<U> {
    mainStageCtor: LayerCtor<T, U>;
}