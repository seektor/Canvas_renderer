import ResizeService from '../../../app/services/resizeService/ResizeService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { TAbstractCanvasViewportParams, TCanvasViewportParams } from '../../../CanvasRenderer/structures/TCanvasViewportParams';
import { CVerticalSliderModel } from './CVerticalSliderModel';
import { CVerticalSliderMainStage } from './stages/CVerticalSliderMainStage';

export class CVerticalSliderViewport extends AbstractCanvasViewport {

    protected mainStage: CVerticalSliderMainStage;
    protected model: CVerticalSliderModel;

    constructor(params: TCanvasViewportParams<CVerticalSliderModel>) {
        const abstractParams: TAbstractCanvasViewportParams<CVerticalSliderMainStage, CVerticalSliderViewport, CVerticalSliderModel> = { ...params, mainStageCtor: (p) => new CVerticalSliderMainStage(p) };
        super(abstractParams);
        this.setResizeService();
        this.render();
    }

    private setResizeService(): void {
        if (!this.isHosted()) {
            ResizeService.subscribeToWindow(this.container, () => requestAnimationFrame(() => {
                this.onResize();
            }), 500);
        }
    }
}