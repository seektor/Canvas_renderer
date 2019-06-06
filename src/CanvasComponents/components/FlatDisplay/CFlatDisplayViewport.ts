import ThemingService from '../../../app/services/themingService/ThemingService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { CFlatDisplayModel } from './CFlatDisplayModel';
import { CFlatDisplayMainStage } from './stages/CFlatDisplayMainStage';
import { CFlatDisplayPainter } from './styles/CFlatDisplayPainter';

export class CFlatDisplayViewport extends AbstractCanvasViewport implements ILayerHost {

    protected model: CFlatDisplayModel;
    protected canvasPainter: CFlatDisplayPainter;

    constructor(model: CFlatDisplayModel) {
        super(model);
        this.canvasPainter = new CFlatDisplayPainter(ThemingService.getTheme());
        ThemingService.onThemeDidChange$.subscribe(() => this.onThemeDidChange());
    }

    private onThemeDidChange(): void {
        this.canvasPainter.applyTheme(ThemingService.getTheme());
        this.forceRerender();
    }

    protected createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): CFlatDisplayMainStage {
        return new CFlatDisplayMainStage({ viewport: this, model: this.model, layerHost, layerParamsExtractor });
    }

    public getCanvasPainter(): CFlatDisplayPainter {
        return this.canvasPainter;
    }
}