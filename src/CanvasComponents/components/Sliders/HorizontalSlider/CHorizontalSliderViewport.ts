import ThemingService from '../../../../app/services/themingService/ThemingService';
import { AbstractCanvasViewport } from '../../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CHorizontalSliderModel } from './CHorizontalSliderModel';
import { CHorizontalSliderMainStage } from './stages/CHorizontalSliderMainStage';
import { CHorizontalSliderPainter } from './styles/CHorizontalSliderPainter';

export class CHorizontalSliderViewport extends AbstractCanvasViewport {

    protected model: CHorizontalSliderModel;
    protected canvasPainter: CHorizontalSliderPainter;

    constructor(model: CHorizontalSliderModel) {
        super(model);
        this.canvasPainter = new CHorizontalSliderPainter(ThemingService.getTheme());
        ThemingService.onThemeDidChange$.subscribe(() => this.onThemeDidChange());
    }

    private onThemeDidChange(): void {
        this.canvasPainter.applyTheme(ThemingService.getTheme());
        this.forceRerender();
    }

    protected createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): CHorizontalSliderMainStage {
        return new CHorizontalSliderMainStage({ viewport: this, model: this.model, layerHost, layerParamsExtractor });
    }

    public getCanvasPainter(): CHorizontalSliderPainter {
        return this.canvasPainter;
    }

    public setVisibility(isVisible: boolean): void {
        this.mainStage.setVisibility(isVisible);
    }

    public onBeforeMainStageResize(): void {
        this.model.updateHandleSizes();
    }

}