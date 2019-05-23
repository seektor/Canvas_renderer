import { AbstractCanvasModel } from '../AbstractCanvasModel';
import { AbstractCanvasViewport } from '../AbstractCanvasViewport';
import { TCanvasViewportParams } from '../structures/TCanvasViewportParams';

export interface ViewportCtor<VIEWPORT extends AbstractCanvasViewport, MODEL extends AbstractCanvasModel> {
    (params: TCanvasViewportParams<MODEL>): VIEWPORT;
}