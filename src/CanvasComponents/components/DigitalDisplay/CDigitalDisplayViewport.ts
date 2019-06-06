import ThemingService from '../../../app/services/themingService/ThemingService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CDigitalDisplayModel } from './CDigitalDIsplayModel';
import { CDigitalDisplayMainStage } from './stages/CDigitalDisplayMainStage';
import { CDigitalDisplayPainter } from './styles/CDigitalDisplayPainter';

export class CDigitalDisplayViewport extends AbstractCanvasViewport implements ILayerHost {

    protected model: CDigitalDisplayModel;
    protected canvasPainter: CDigitalDisplayPainter;

    constructor(model: CDigitalDisplayModel) {
        super(model);
        this.canvasPainter = new CDigitalDisplayPainter(ThemingService.getTheme());
        ThemingService.onThemeDidChange$.subscribe(() => this.onThemeDidChange());
    }

    private onThemeDidChange(): void {
        this.canvasPainter.applyTheme(ThemingService.getTheme());
        this.forceRerender();
    }

    protected createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): CDigitalDisplayMainStage {
        return new CDigitalDisplayMainStage({ viewport: this, model: this.model, layerHost, layerParamsExtractor });
    }

    public getCanvasPainter(): CDigitalDisplayPainter {
        return this.canvasPainter;
    }

}