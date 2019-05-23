import ResizeService from '../../../app/services/resizeService/ResizeService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { TAbstractCanvasViewportParams, TCanvasViewportParams } from '../../../CanvasRenderer/structures/TCanvasViewportParams';
import { CFlatDisplayModel } from './CFlatDisplayModel';
import { CFlatDisplayMainStage } from './stages/CFlatDisplayMainStage';

export class CFlatDisplayViewport extends AbstractCanvasViewport implements ILayerHost {

    protected mainStage: CFlatDisplayMainStage;
    protected model: CFlatDisplayModel;

    constructor(params: TCanvasViewportParams<CFlatDisplayModel>) {
        const abstractParams: TAbstractCanvasViewportParams<CFlatDisplayMainStage, CFlatDisplayViewport, CFlatDisplayModel> = { ...params, mainStageCtor: (p) => new CFlatDisplayMainStage(p) }
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