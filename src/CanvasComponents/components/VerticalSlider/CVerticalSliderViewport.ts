import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { TAbstractViewportParams, TViewportParams } from '../../../CanvasRenderer/structures/TViewportParams';
import ResizeService from '../../../app/services/resizeService/ResizeService';
import { CVerticalSliderMainStage } from './stages/CVerticalSliderMainStage';
import { CVerticalSliderModel } from './CVerticalSliderModel';

export class CVerticalSliderViewport extends AbstractCanvasViewport {

    protected mainStage: CVerticalSliderMainStage;
    protected model: CVerticalSliderModel;

    constructor(params: TViewportParams<CVerticalSliderModel>) {
        const abstractParams: TAbstractViewportParams<CVerticalSliderMainStage, CVerticalSliderModel> = { ...params, mainStageCtor: (l, m, p) => new CVerticalSliderMainStage(l, m, p) };
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