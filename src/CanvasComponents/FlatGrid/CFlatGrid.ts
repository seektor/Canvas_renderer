import { CFlatGridModel } from "./CFlatGridModel";
import { CFlatGridViewport } from "./CFlatGridViewport";
import { AbstractCanvasComponent } from "../../CanvasRenderer/AbstractCanvasComponent";
import { ViewportCtor } from "../../CanvasRenderer/interfaces/ViewportCtor";

export class CFlatGrid extends AbstractCanvasComponent {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;
    protected viewportCtor: ViewportCtor<CFlatGridViewport>;

    constructor() {
        super();
        this.model = new CFlatGridModel();
        this.viewportCtor = (params) => new CFlatGridViewport(params);
    }
}