import ThemingService from '../../../../app/services/themingService/ThemingService';
import { AbstractCanvasViewport } from '../../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CVerticalScrollbarModel } from './CVerticalScrollbarModel';
import { CVerticalScrollbarMainStage } from './stages/CVerticalScrollbarMainStage';
import { CVerticalScrollbarPainter as CVerticalScrollbarPainter } from './styles/CVerticalScrollbarPainter';

export class CVerticalScrollbarViewport extends AbstractCanvasViewport {

    protected model: CVerticalScrollbarModel;
    protected canvasPainter: CVerticalScrollbarPainter;

    constructor(model: CVerticalScrollbarModel) {
        super(model);
        this.canvasPainter = new CVerticalScrollbarPainter(ThemingService.getTheme());
        ThemingService.onThemeDidChange$.subscribe(() => this.onThemeDidChange());
    }

    private onThemeDidChange(): void {
        this.canvasPainter.applyTheme(ThemingService.getTheme());
        this.forceRerender();
    }

    protected createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): CVerticalScrollbarMainStage {
        return new CVerticalScrollbarMainStage({ viewport: this, model: this.model, layerHost, layerParamsExtractor });
    }

    public getCanvasPainter(): CVerticalScrollbarPainter {
        return this.canvasPainter;
    }

    public setVisibility(isVisible: boolean): void {
        this.mainStage.setVisibility(isVisible);
    }

    public onBeforeMainStageResize(): void {
        this.model.updateHandleSizes();
    }

}