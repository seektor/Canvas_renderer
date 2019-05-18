import ResizeService from '../../../app/services/resizeService/ResizeService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { TAbstractCanvasViewportParams, TCanvasViewportParams } from '../../../CanvasRenderer/structures/TCanvasViewportParams';
import { CGaugeModel } from './CGaugeModel';
import { CGaugeMainStage } from './stages/CGaugeMainStage';

export class CGaugeViewport extends AbstractCanvasViewport implements ILayerHost {

    protected mainStage: CGaugeMainStage;
    protected model: CGaugeModel;

    constructor(params: TCanvasViewportParams<CGaugeModel>) {
        const abstractParams: TAbstractCanvasViewportParams<CGaugeMainStage, CGaugeModel> = { ...params, mainStageCtor: (p) => new CGaugeMainStage(p) }
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