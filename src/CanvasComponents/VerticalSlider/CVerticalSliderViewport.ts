import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { TViewportParams } from "../../CanvasRenderer/structures/TViewportParams";
import ResizeService from "../../app/services/resizeService/ResizeService";
import { CVerticalSliderMainStage } from "./layers/CVerticalSliderMainStage";

export class CVerticalSliderViewport extends AbstractCanvasViewport {

    protected mainStage: CVerticalSliderMainStage;

    constructor(params: TViewportParams) {
        super(params);
        this.mainStage = new CVerticalSliderMainStage(this, this.getMainStagePosAndDim());
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