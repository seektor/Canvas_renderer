import ResizeService from '../../../app/services/resizeService/ResizeService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { TAbstractCanvasViewportParams, TCanvasViewportParams } from '../../../CanvasRenderer/structures/TCanvasViewportParams';
import { CDigitalDisplayModel } from './CDigitalDIsplayModel';
import { CDigitalDisplayMainStage } from './stages/CDigitalDisplayMainStage';

export class CDigitalDisplayViewport extends AbstractCanvasViewport implements ILayerHost {

    protected mainStage: CDigitalDisplayMainStage;
    protected model: CDigitalDisplayModel;

    constructor(params: TCanvasViewportParams<CDigitalDisplayModel>) {
        const abstractParams: TAbstractCanvasViewportParams<CDigitalDisplayMainStage, CDigitalDisplayModel> = { ...params, mainStageCtor: (p) => new CDigitalDisplayMainStage(p) }
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