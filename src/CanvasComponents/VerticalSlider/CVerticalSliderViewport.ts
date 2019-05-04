import { AbstractCanvasViewport } from '../../CanvasRenderer/AbstractCanvasViewport';
import { TAbstractViewportParams, TViewportParams } from '../../CanvasRenderer/structures/TViewportParams';
import ResizeService from '../../app/services/resizeService/ResizeService';
import { CVerticalSliderMainStage } from './layers/CVerticalSliderMainStage';

export class CVerticalSliderViewport extends AbstractCanvasViewport {

    protected mainStage: CVerticalSliderMainStage;

    constructor(params: TViewportParams) {
        const abstractParams: TAbstractViewportParams<CVerticalSliderMainStage> = { ...params, mainStageCtor: (l, p) => new CVerticalSliderMainStage(l, p) }
        super(abstractParams);
        this.setResizeService();
        this.renderMainStage();
    }

    private setResizeService(): void {
        if (!this.isHosted) {
            ResizeService.subscribeToWindow(this.container, () => requestAnimationFrame(() => {
                this.onResize();
            }), 500);
        }
    }
}