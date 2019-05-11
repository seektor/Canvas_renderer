import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { CFlatGridModel } from '../CFlatGridModel';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CRectBaseLayer } from '../../../commonLayers/RectBaseLayer/CRectBaseLayer';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { TLayerRect } from '../../../../CanvasRenderer/structures/TLayerRect';
import ThemingService from '../../../../app/services/themingService/ThemingService';
import { CFlatGridStage } from './CFlatGridStage';
import { CVerticalSlider } from '../../VerticalSlider/CVerticalSlider';

export class CFlatGridMainStage extends AbstractCanvasStage {

    protected model: CFlatGridModel;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.createLayers();
    }

    private getMainStageLayerParams(): TLayerRenderParams {
        const displayRect: TLayerRect = this.model.getDisplayRect();
        return {
            dX: 0,
            dY: 0,
            height: displayRect.height,
            width: displayRect.width
        }
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
        const backgroundLayer: ILayer = new CRectBaseLayer({ layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: (_layer) => this.getMainStageLayerParams(), config: { backgroundColor: ThemingService.getTheme().colorBackgroundDarker } });
        this.addLayer(backgroundLayer);

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