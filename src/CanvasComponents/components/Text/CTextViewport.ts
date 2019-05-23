import ResizeService from '../../../app/services/resizeService/ResizeService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { TAbstractCanvasViewportParams, TCanvasViewportParams } from '../../../CanvasRenderer/structures/TCanvasViewportParams';
import { CTextModel } from './CTextModel';
import { CTextMainStage } from './stages/CTextMainStage';

export class CTextViewport extends AbstractCanvasViewport implements ILayerHost {

    protected mainStage: CTextMainStage;
    protected model: CTextModel;

    constructor(params: TCanvasViewportParams<CTextModel>) {
        const abstractParams: TAbstractCanvasViewportParams<CTextMainStage, CTextViewport, CTextModel> = { ...params, mainStageCtor: (p) => new CTextMainStage(p) }
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