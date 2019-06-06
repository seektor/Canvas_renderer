import ThemingService from '../../../app/services/themingService/ThemingService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CGaugeModel } from './CGaugeModel';
import { CGaugeMainStage } from './stages/CGaugeMainStage';
import { CGaugePainter } from './styles/CGaugePainter';

export class CGaugeViewport extends AbstractCanvasViewport implements ILayerHost {

    protected model: CGaugeModel;
    protected canvasPainter: CGaugePainter;

    constructor(model: CGaugeModel) {
        super(model);
        ThemingService.onThemeDidChange$.subscribe(() => this.onThemeDidChange());
        this.canvasPainter = new CGaugePainter(ThemingService.getTheme(), this.model.getGaugeAngleRange(), this.model.getGaugeColorRanges());
    }

    private onThemeDidChange(): void {
        this.canvasPainter.applyTheme(ThemingService.getTheme());
        this.forceRerender();
    }

    protected createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): CGaugeMainStage {
        return new CGaugeMainStage({ viewport: this, model: this.model, layerHost, layerParamsExtractor });
    }

    public getCanvasPainter(): CGaugePainter {
        return this.canvasPainter;
    }

}