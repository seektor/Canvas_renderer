import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { TAbstractCanvasViewportParams, TCanvasViewportParams } from '../../../CanvasRenderer/structures/TCanvasViewportParams';
import ResizeService from '../../../app/services/resizeService/ResizeService';
import { CVerticalSliderMainStage } from './stages/CVerticalSliderMainStage';
import { CVerticalSliderModel } from './CVerticalSliderModel';

export class CVerticalSliderViewport extends AbstractCanvasViewport {

    protected mainStage: CVerticalSliderMainStage;
    protected model: CVerticalSliderModel;

    constructor(params: TCanvasViewportParams<CVerticalSliderModel>) {
        const abstractParams: TAbstractCanvasViewportParams<CVerticalSliderMainStage, CVerticalSliderModel> = { ...params, mainStageCtor: (l, gv, m, p) => new CVerticalSliderMainStage(l, gv, m, p) };
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