import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { TViewportParams, TAbstractViewportParams } from '../../../CanvasRenderer/structures/TViewportParams';
import ResizeService from '../../../app/services/resizeService/ResizeService';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { CFlatGridMainStage } from './layers/CFlatGridMainStage';

export class CFlatGridViewport extends AbstractCanvasViewport implements ILayerHost {

    protected mainStage: CFlatGridMainStage;

    constructor(params: TViewportParams) {
        const abstractParams: TAbstractViewportParams<CFlatGridMainStage> = { ...params, mainStageCtor: (l, p) => new CFlatGridMainStage(l, p) }
        super(abstractParams);
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