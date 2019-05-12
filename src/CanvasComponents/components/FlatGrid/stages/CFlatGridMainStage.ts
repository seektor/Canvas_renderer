import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CVerticalSlider } from '../../VerticalSlider/CVerticalSlider';
import { CFlatGridModel } from '../CFlatGridModel';
import { CFlatGridStage } from './CFlatGridStage';

export class CFlatGridMainStage extends AbstractCanvasStage {

    protected model: CFlatGridModel;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.createLayers();
    }

    protected renderSelfLayer(): void {
        this.model.getCanvasPainter().drawBackground(this.layerContext, this.getLayerRect());
    }

    private getFlatGridLayerParams(): TLayerRenderParams {
        return {
            dX: this.dX,
            dY: this.dY,
            height: Math.min(40, this.layerHeight),
            width: Math.max(this.layerWidth - 20, 0)
        }
    }

    private getVerticalSliderLayerParams(): TLayerRenderParams {
        const flatGridParams: TLayerRenderParams = this.getFlatGridLayerParams();
        return {
            dX: flatGridParams.width,
            dY: this.dY,
            height: this.layerHeight,
            width: 20
        }
    }

    protected createLayers(): void {
        const flatGridStage: ILayer = new CFlatGridStage({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: () => this.getFlatGridLayerParams()
        });
        this.addLayer(flatGridStage);

        const verticalSlider: CVerticalSlider = new CVerticalSlider();
        verticalSlider.createViewport(this.globalViewport.getContainer(), {
            globalViewport: this.globalViewport,
            displayLayerRectExtractor: (_layer: ILayer) => this.getVerticalSliderLayerParams(),
            layerHost: this
        });
        this.addComponent(verticalSlider);
    }
}