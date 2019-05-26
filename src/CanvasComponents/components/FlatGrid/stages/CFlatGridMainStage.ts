import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CVerticalSlider } from '../../VerticalSlider/CVerticalSlider';
import { CFlatGridModel } from '../CFlatGridModel';
import { CFlatGridViewport } from '../CFlatGridViewport';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';
import { CFlatGridStage } from './CFlatGridStage';

export class CFlatGridMainStage extends AbstractCanvasStage {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;
    protected canvasPainter: CFlatGridPainter;
    private verticalSliderMainStage: ILayer;

    constructor(params: TLayerParams<CFlatGridModel, CFlatGridViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.onLayerDidUpdate();
        this.createLayers();
    }

    public isVerticalScrollbarVisible(): boolean {
        const totalRowsHeight: number = this.viewport.getTotalRowsHeight();
        // const dataLayerHeight: number = this.canvasPainter.getCalculatedDataLayerDisplayHeight(this.layerHeight);
        return false;
    }

    protected onLayerDidUpdate(): void {
        this.viewport.onFlatGridResize();
    }

    protected renderSelfLayer(): void {
        this.canvasPainter.drawBackground(this.layerContext, this.getLayerRect());
    }

    private getFlatGridLayerParams(): TLayerRenderParams {
        const isVScrollbarVisible: boolean = this.isVerticalScrollbarVisible();
        const layerWidth: number = isVScrollbarVisible ? Math.max(this.layerWidth - this.viewport.getVerticalScrollbarWidth(), 0) : this.layerWidth;
        return {
            dX: this.dX,
            dY: this.dY,
            height: this.layerHeight,
            width: layerWidth
        }
    }

    private getVerticalSliderLayerParams(): TLayerRenderParams {
        // const isVScrollbarVisible: boolean = this.isVerticalScrollbarVisible();
        const verticalScrollbarWidth: number = this.viewport.getVerticalScrollbarWidth();
        return {
            dX: Math.max(this.layerWidth - verticalScrollbarWidth, 0),
            dY: this.dY,
            height: this.layerHeight,
            width: verticalScrollbarWidth
        }
    }

    protected createLayers(): void {
        const flatGridStage: ILayer = new CFlatGridStage({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: () => this.getFlatGridLayerParams()
        });
        this.addLayer(flatGridStage);

        const verticalSlider: CVerticalSlider = new CVerticalSlider();
        //const verticalSliderHandlers: ISliderHandlers = verticalSlider.getSliderHandlers();
        //this.model.setVerticalSliderHandlers(verticalSliderHandlers);
        verticalSlider.initViewport(this.viewport.getContainer(), {
            hostingViewport: this.viewport,
            displayLayerRectExtractor: (_layer: ILayer) => this.getVerticalSliderLayerParams(),
            layerHost: this
        });
        this.verticalSliderMainStage = verticalSlider.getMainStage();
        this.verticalSliderMainStage.setVisibility(false);
        this.addComponent(verticalSlider);
    }
}