import { CFlatGridModel } from "./CFlatGridModel";
import { CFlatGridViewport } from "./CFlatGridViewport";
import { AbstractCanvasComponent } from "../../CanvasRenderer/AbstractCanvasComponent";
import { ViewportCtor } from "../../CanvasRenderer/interfaces/ViewportCtor";

export class CFlatGrid extends AbstractCanvasComponent {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;
    protected viewportCtor: ViewportCtor<CFlatGridViewport>;

    constructor(container: HTMLElement, delayViewportCreation?: boolean) {
        super(container);
        this.model = new CFlatGridModel();
        this.viewportCtor = (c, p?) => new CFlatGridViewport(c, p);
        if (!delayViewportCreation) {
            this.viewport = this.viewportCtor(container);
        }
    }
}