import { AbstractCanvasMainStage } from '../../../../CanvasRenderer/AbstractCanvasMainStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CVerticalSlider } from '../../VerticalSlider/CVerticalSlider';
import { ISliderHandlers } from '../../VerticalSlider/interfaces/ISliderHandlers';
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

    private getVerticalSliderLayerParams(): TLayerRenderParams {
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
        const verticalSliderHandlers: ISliderHandlers = verticalSlider.getSliderHandlers();
        this.viewport.setVerticalSliderHandlers(verticalSliderHandlers);
        verticalSlider.initViewport(this.viewport.getContainer(), {
            hostingViewport: this.viewport,
            displayLayerRectExtractor: (_layer: ILayer) => this.getVerticalSliderLayerParams(),
            layerHost: this
        });
        this.addComponent(verticalSlider);
    }
}