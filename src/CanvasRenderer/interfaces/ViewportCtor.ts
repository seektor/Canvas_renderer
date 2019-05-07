import { AbstractCanvasViewport } from '../AbstractCanvasViewport';
import { TCanvasViewportParams } from '../structures/TCanvasViewportParams';
import { AbstractCanvasModel } from '../AbstractCanvasModel';

export interface ViewportCtor<T extends AbstractCanvasViewport, U extends AbstractCanvasModel> {
    (params: TCanvasViewportParams<U>): T;
}