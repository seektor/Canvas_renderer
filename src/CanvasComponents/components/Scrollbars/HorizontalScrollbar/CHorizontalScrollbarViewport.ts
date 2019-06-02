import ThemingService from '../../../../app/services/themingService/ThemingService';
import { AbstractCanvasViewport } from '../../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CHorizontalScrollbarModel } from './CHorizontalScrollbarModel';
import { CHorizontalScrollbarMainStage } from './stages/CHorizontalScrollbarMainStage';
import { CHorizontalScrollbarPainter } from './styles/CHorizontalScrollbarPainter';

export class CHorizontalScrollbarViewport extends AbstractCanvasViewport {

    protected model: CHorizontalScrollbarModel;
    protected canvasPainter: CHorizontalScrollbarPainter;

    constructor(model: CHorizontalScrollbarModel) {
        super(model);
        this.canvasPainter = new CHorizontalScrollbarPainter(ThemingService.getTheme());
        ThemingService.onThemeDidChange$.subscribe(() => this.onThemeDidChange());
    }

    private onThemeDidChange(): void {
        this.canvasPainter.applyTheme(ThemingService.getTheme());
        this.forceRerender();
    }

    protected createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): CHorizontalScrollbarMainStage {
        return new CHorizontalScrollbarMainStage({ viewport: this, model: this.model, layerHost, layerParamsExtractor });
    }

    public getCanvasPainter(): CHorizontalScrollbarPainter {
        return this.canvasPainter;
    }

    public setVisibility(isVisible: boolean): void {
        this.mainStage.setVisibility(isVisible);
    }

    public onBeforeMainStageResize(): void {
        this.model.updateHandleSizes();
    }

}