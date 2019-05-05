import { AbstractCanvasModel } from '../AbstractCanvasModel';
import { TLayerHostingParams } from './TLayerHostingParams';
import { LayerCtor } from '../interfaces/LayerCtor';
import { AbstractCanvasStage } from '../AbstractCanvasStage';

export interface TViewportParams<T extends AbstractCanvasModel> {
    container: HTMLElement;
    model: T;
    hostingParams?: TLayerHostingParams;
}

export interface TAbstractViewportParams<T extends AbstractCanvasStage, U extends AbstractCanvasModel> extends TViewportParams<U> {
    mainStageCtor: LayerCtor<T, U>;
}