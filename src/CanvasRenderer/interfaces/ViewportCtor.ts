import { AbstractCanvasViewport } from '../AbstractCanvasViewport';
import { TViewportParams } from '../structures/TViewportParams';

export interface ViewportCtor<T extends AbstractCanvasViewport> {
    (params: TViewportParams): T;
}