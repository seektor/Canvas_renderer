import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { TViewportParams } from "../../CanvasRenderer/structures/TViewportParams";
import ResizeService from "../../app/services/resizeService/ResizeService";
import { ILayerHost } from "../../CanvasRenderer/interfaces/ILayerHost";
import { CFlatGridMainStage } from "./layers/CFlatGridMainStage";

export class CFlatGridViewport extends AbstractCanvasViewport implements ILayerHost {

    protected mainStage: CFlatGridMainStage;

    constructor(params: TViewportParams) {
        super(params);
        this.mainStage = new CFlatGridMainStage(this, this.getMainStagePosAndDim());
        this.setResizeService();
        this.renderMainStage();
    }

    private setResizeService() {
        if (!this.isHosted) {
            ResizeService.subscribeToWindow(this.container, () => requestAnimationFrame(() => {
                this.onResize();
            }), 500);
        }
    }

}