import ResizeService from '../../../app/services/resizeService/ResizeService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { TAbstractCanvasViewportParams, TCanvasViewportParams } from '../../../CanvasRenderer/structures/TCanvasViewportParams';
import { CFlatGridModel } from './CFlatGridModel';
import { CFlatGridMainStage } from './stages/CFlatGridMainStage';

export class CFlatGridViewport extends AbstractCanvasViewport implements ILayerHost {

    protected mainStage: CFlatGridMainStage;
    protected model: CFlatGridModel;

    constructor(params: TCanvasViewportParams<CFlatGridModel>) {
        const abstractParams: TAbstractCanvasViewportParams<CFlatGridMainStage, CFlatGridViewport, CFlatGridModel> = { ...params, mainStageCtor: (p) => new CFlatGridMainStage(p) }
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