import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CVerticalSlider } from '../../VerticalSlider/CVerticalSlider';
import { ISliderHandlers } from '../../VerticalSlider/interfaces/ISliderHandlers';
import { CFlatGridModel } from '../CFlatGridModel';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';
import { CFlatGridStage } from './CFlatGridStage';

export class CFlatGridMainStage extends AbstractCanvasStage {

    protected model: CFlatGridModel;
    protected canvasPainter: CFlatGridPainter;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.canvasPainter = this.model.getCanvasPainter();
        this.createLayers();
    }

    public isVerticalScrollbarVisible(): boolean {
        const totalRowsHeight: number = this.model.getTotalRowsHeight();
        const dataLayerHeight: number = this.canvasPainter.getDataLayerDisplayHeight(this.layerHeight);
        return dataLayerHeight < totalRowsHeight;
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
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: () => this.getFlatGridLayerParams()
        });
        this.addLayer(flatGridStage);

        const verticalSlider: CVerticalSlider = new CVerticalSlider();
        const verticalSliderHandlers: ISliderHandlers = verticalSlider.getSliderHandlers();
        this.model.setVerticalSliderHandlers(verticalSliderHandlers);
        verticalSlider.createViewport(this.globalViewport.getContainer(), {
            globalViewport: this.globalViewport,
            displayLayerRectExtractor: (_layer: ILayer) => this.getVerticalSliderLayerParams(),
            layerHost: this
        });
        this.addComponent(verticalSlider);
    }
}