import { AbstractCanvasMainStage } from '../../../../CanvasRenderer/AbstractCanvasMainStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CHorizontalSlider } from '../../Sliders/HorizontalSlider/CHorizontalSlider';
import { ISliderHandlers } from '../../Sliders/interfaces/ISliderHandlers';
import { CVerticalSlider } from '../../Sliders/VerticalSlider/CVerticalSlider';
import { CFlatGridModel } from '../CFlatGridModel';
import { CFlatGridViewport } from '../CFlatGridViewport';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';
import { CFlatGridStage } from './CFlatGridStage';

export class CFlatGridMainStage extends AbstractCanvasMainStage {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;
    protected canvasPainter: CFlatGridPainter;

    constructor(params: TLayerParams<CFlatGridModel, CFlatGridViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.createLayers();
    }

    protected renderSelfLayer(): void {
        this.canvasPainter.drawBackground(this.layerContext, this.getLayerRect());
    }

    private getFlatGridLayerParams(): TLayerRenderParams {
        return {
            dX: this.dX,
            dY: this.dY,
            height: this.layerHeight,
            width: this.layerWidth
        }
    }

    private getVerticalScrollbarLayerParams(): TLayerRenderParams {
        const verticalScrollbarWidth: number = this.viewport.getVerticalScrollbarWidth();
        const horizontalScrollbarDiff: number = this.viewport.isHorizontalScrollbarVisible() ? this.viewport.getHorizontalScrollbarHeight() : 0;
        return {
            dX: Math.max(this.layerWidth - verticalScrollbarWidth, 0),
            dY: this.dY,
            height: Math.max(this.layerHeight - horizontalScrollbarDiff, 0),
            width: verticalScrollbarWidth
        }
    }

    private getHorizontalSliderLayerParams(): TLayerRenderParams {
        const horizontalScrollbarHeight: number = this.viewport.getHorizontalScrollbarHeight();
        const verticalScrollbarDiff: number = this.viewport.isVerticalScrollbarVisible() ? this.viewport.getVerticalScrollbarWidth() : 0;
        return {
            dX: this.dX,
            dY: Math.max(this.layerHeight - horizontalScrollbarHeight, 0),
            height: horizontalScrollbarHeight,
            width: Math.max(this.layerWidth - verticalScrollbarDiff, 0)
        }
    }

    protected createLayers(): void {
        const flatGridStage: ILayer = new CFlatGridStage({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: () => this.getFlatGridLayerParams()
        });
        this.addLayer(flatGridStage);

        const verticalSlider: CVerticalSlider = new CVerticalSlider();
        const verticalSliderHandlers: ISliderHandlers = verticalSlider.getSliderHandlers();
        this.viewport.setVerticalSliderHandlers(verticalSliderHandlers);
        verticalSlider.initViewport(this.viewport.getContainer(), {
            hostingViewport: this.viewport,
            displayLayerRectExtractor: (_layer: ILayer) => this.getVerticalScrollbarLayerParams(),
            layerHost: this
        });
        this.addComponent(verticalSlider);

        const horizontalSlider: CHorizontalSlider = new CHorizontalSlider();
        const horizontalSliderHandlers: ISliderHandlers = horizontalSlider.getSliderHandlers();
        this.viewport.setHorizontalSliderHandlers(horizontalSliderHandlers);
        horizontalSlider.initViewport(this.viewport.getContainer(), {
            hostingViewport: this.viewport,
            displayLayerRectExtractor: (_layer: ILayer) => this.getHorizontalSliderLayerParams(),
            layerHost: this
        });
        this.addComponent(horizontalSlider);
    }
}