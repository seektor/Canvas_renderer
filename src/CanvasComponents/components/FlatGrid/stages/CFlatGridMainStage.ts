import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CVerticalSlider } from '../../VerticalSlider/CVerticalSlider';
import { ISliderHandlers } from '../../VerticalSlider/interfaces/ISliderHandlers';
import { CFlatGridModel } from '../CFlatGridModel';
import { CFlatGridViewport } from '../CFlatGridViewport';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';
import { CFlatGridStage } from './CFlatGridStage';

export class CFlatGridMainStage extends AbstractCanvasStage {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;
    protected canvasPainter: CFlatGridPainter;

    constructor(params: TLayerParams<CFlatGridModel, CFlatGridViewport, unknown>) {
        super(params);
        this.canvasPainter = this.model.getCanvasPainter();
        this.createLayers();
        this.updateParams();
    }

    public isVerticalScrollbarVisible(): boolean {
        const totalRowsHeight: number = this.model.getTotalRowsHeight();
        const dataLayerHeight: number = this.canvasPainter.getCalculatedDataLayerDisplayHeight(this.layerHeight);
        return dataLayerHeight < totalRowsHeight;
    }

    protected updateParams(): void {
        const dataLayerDisplayHeight: number = this.canvasPainter.getCalculatedDataLayerDisplayHeight(this.layerHeight);
        this.canvasPainter.setDataLayerDisplayHeight(dataLayerDisplayHeight);
    }

    protected renderSelfLayer(): void {
        this.model.getCanvasPainter().drawBackground(this.layerContext, this.getLayerRect());
    }

    private getFlatGridLayerParams(): TLayerRenderParams {
        const isVScrollbarVisible: boolean = this.isVerticalScrollbarVisible();
        const layerWidth: number = isVScrollbarVisible ? Math.max(this.layerWidth - this.canvasPainter.getVerticalScrollWidth(), 0) : this.layerWidth;
        return {
            dX: this.dX,
            dY: this.dY,
            height: this.layerHeight,
            width: layerWidth
        }
    }

    private getVerticalSliderLayerParams(): TLayerRenderParams {
        const isVScrollbarVisible: boolean = this.isVerticalScrollbarVisible();
        const verticalScrollbarWidth: number = this.canvasPainter.getVerticalScrollWidth();
        return {
            dX: this.layerWidth - verticalScrollbarWidth,
            dY: this.dY,
            height: this.layerHeight,
            width: isVScrollbarVisible ? verticalScrollbarWidth : 0
        }
    }

    protected createLayers(): void {
        const flatGridStage: ILayer = new CFlatGridStage({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: () => this.getFlatGridLayerParams()
        });
        this.addLayer(flatGridStage);

        const verticalSlider: CVerticalSlider = new CVerticalSlider();
        const verticalSliderHandlers: ISliderHandlers = verticalSlider.getSliderHandlers();
        this.model.setVerticalSliderHandlers(verticalSliderHandlers);
        verticalSlider.createViewport(this.viewport.getContainer(), {
            hostingViewport: this.viewport,
            displayLayerRectExtractor: (_layer: ILayer) => this.getVerticalSliderLayerParams(),
            layerHost: this
        });
        this.addComponent(verticalSlider);
    }
}