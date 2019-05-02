import { AbstractCanvasViewport } from "../AbstractCanvasViewport";
import { TViewportParams } from "../structures/TViewportParams";

export interface ViewportCtor<T extends AbstractCanvasViewport> {
    (container: HTMLElement, params?: TViewportParams): T;
}