import ThemingService from '../../../../app/services/themingService/ThemingService';
import { AbstractCanvasViewport } from '../../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CVerticalSliderModel } from './CVerticalSliderModel';
import { CVerticalSliderMainStage } from './stages/CVerticalSliderMainStage';
import { CVerticalSliderPainter } from './styles/CVerticalSliderPainter';

export class CVerticalSliderViewport extends AbstractCanvasViewport {

    protected model: CVerticalSliderModel;
    protected canvasPainter: CVerticalSliderPainter;

    constructor(model: CVerticalSliderModel) {
        super(model);
        this.canvasPainter = new CVerticalSliderPainter(ThemingService.getTheme());
        ThemingService.onThemeDidChange$.subscribe(() => this.onThemeDidChange());
    }

    private onThemeDidChange(): void {
        this.canvasPainter.applyTheme(ThemingService.getTheme());
        this.forceRerender();
    }

    protected createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): CVerticalSliderMainStage {
        return new CVerticalSliderMainStage({ viewport: this, model: this.model, layerHost, layerParamsExtractor });
    }

    public getCanvasPainter(): CVerticalSliderPainter {
        return this.canvasPainter;
    }

    public setVisibility(isVisible: boolean): void {
        this.mainStage.setVisibility(isVisible);
    }

    public onBeforeMainStageResize(): void {
        this.model.updateHandleSizes();
    }

}