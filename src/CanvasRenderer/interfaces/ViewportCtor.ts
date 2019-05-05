import { AbstractCanvasViewport } from '../AbstractCanvasViewport';
import { TViewportParams } from '../structures/TViewportParams';
import { AbstractCanvasModel } from '../AbstractCanvasModel';

export interface ViewportCtor<T extends AbstractCanvasViewport, U extends AbstractCanvasModel> {
    (params: TViewportParams<U>): T;
}