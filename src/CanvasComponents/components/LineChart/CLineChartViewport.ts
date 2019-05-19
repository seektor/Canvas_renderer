import ResizeService from '../../../app/services/resizeService/ResizeService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { TAbstractCanvasViewportParams, TCanvasViewportParams } from '../../../CanvasRenderer/structures/TCanvasViewportParams';
import { CLineChartModel } from './CLineChartModel';
import { CLineChartMainStage } from './stages/CLineChartMainStage';

export class CLineChartViewport extends AbstractCanvasViewport implements ILayerHost {

    protected mainStage: CLineChartMainStage;
    protected model: CLineChartModel;

    constructor(params: TCanvasViewportParams<CLineChartModel>) {
        const abstractParams: TAbstractCanvasViewportParams<CLineChartMainStage, CLineChartModel> = { ...params, mainStageCtor: (p) => new CLineChartMainStage(p) }
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