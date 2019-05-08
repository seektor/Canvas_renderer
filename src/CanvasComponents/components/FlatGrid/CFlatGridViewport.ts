import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { TCanvasViewportParams, TAbstractCanvasViewportParams } from '../../../CanvasRenderer/structures/TCanvasViewportParams';
import ResizeService from '../../../app/services/resizeService/ResizeService';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { CFlatGridModel } from './CFlatGridModel';
import { CFlatGridMainStage } from './stages/CFlatGridMainStage';

export class CFlatGridViewport extends AbstractCanvasViewport implements ILayerHost {

    protected mainStage: CFlatGridMainStage;
    protected model: CFlatGridModel;

    constructor(params: TCanvasViewportParams<CFlatGridModel>) {
        const abstractParams: TAbstractCanvasViewportParams<CFlatGridMainStage, CFlatGridModel> = { ...params, mainStageCtor: (l, gv, m, p) => new CFlatGridMainStage(l, gv, m, p) }
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