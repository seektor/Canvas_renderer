import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { TViewportParams, TAbstractViewportParams } from '../../../CanvasRenderer/structures/TViewportParams';
import ResizeService from '../../../app/services/resizeService/ResizeService';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { CFlatGridModel } from './CFlatGridModel';
import { CFlatGridMainStage } from './stages/CFlatGridMainStage';

export class CFlatGridViewport extends AbstractCanvasViewport implements ILayerHost {

    protected mainStage: CFlatGridMainStage;
    protected model: CFlatGridModel;

    constructor(params: TViewportParams<CFlatGridModel>) {
        const abstractParams: TAbstractViewportParams<CFlatGridMainStage, CFlatGridModel> = { ...params, mainStageCtor: (l, m, p) => new CFlatGridMainStage(l, m, p) }
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