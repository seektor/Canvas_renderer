import { AbstractCanvasMainStage } from '../../../../../CanvasRenderer/AbstractCanvasMainStage';
import { ILayer } from '../../../../../CanvasRenderer/interfaces/ILayer';
import { TDimensions } from '../../../../../CanvasRenderer/structures/TDimensions';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRect } from '../../../../../CanvasRenderer/structures/TLayerRect';
import { TLayerRenderParams } from '../../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CHorizontalSliderModel } from '../CHorizontalSliderModel';
import { CHorizontalSliderViewport } from '../CHorizontalSliderViewport';
import { CHorizontalSliderBackgroundLayer } from '../layers/CHorizontalSliderBackgroundLayer';
import { CHorizontalSliderPainter } from '../styles/CHorizontalSliderPainter';

export class CHorizontalSliderMainStage extends AbstractCanvasMainStage {

    protected model: CHorizontalSliderModel;
    protected viewport: CHorizontalSliderViewport;
    protected canvasPainter: CHorizontalSliderPainter;

    constructor(params: TLayerParams<CHorizontalSliderModel, CHorizontalSliderViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.createLayers();
    }

    private getMainStageLayerParams(): TLayerRenderParams {
        const displayRect: TLayerRect = this.viewport.getLayerDisplayRect();
        return {
            dX: 0,
            dY: 0,
            height: displayRect.height,
            width: displayRect.width
        }
    }

    private getButtonDimensions(): TDimensions {
        const displayRect: TLayerRect = this.viewport.getLayerDisplayRect();
        return {
            height: displayRect.width,
            width: displayRect.width
        }
    }

    private getUpBtnLayerParams(): TLayerRenderParams {
        const btnDimensions: TDimensions = this.getButtonDimensions();
        return { dX: 0, dY: 0, ...btnDimensions };
    }

    private getDownBtnLayerParams(): TLayerRenderParams {
        const btnDimensions: TDimensions = this.getButtonDimensions();
        return { dX: 0, dY: this.layerHeight - btnDimensions.height, ...btnDimensions };
    }

    private getTrackStageLayerParams(): TLayerRenderParams {
        const btnDimensions: TDimensions = this.getButtonDimensions();
        const borderWidth: number = this.canvasPainter.getSliderBorderWidth(this.layerWidth);
        return ({
            dX: borderWidth,
            dY: btnDimensions.height,
            width: this.layerWidth - 2 * borderWidth,
            height: this.layerHeight - 2 * btnDimensions.height
        })
    }

    protected createLayers(): void {
        const baseLayer: ILayer = new CHorizontalSliderBackgroundLayer({
            layerHost: this, viewport
                : this.viewport
            , model: this.model, layerParamsExtractor: (_layer) => this.getMainStageLayerParams()
        });
        this.addLayer(baseLayer);

        // const upBtn: ILayer = new CVerticalSliderButtonLayer({
        //     layerHost: this, viewport
        //         : this.viewport
        //     , model: this.model, layerParamsExtractor: () => this.getUpBtnLayerParams(), config: { direction: Direction.Up, callback: () => this.model.onSliderButtonDecrease() }
        // });
        // this.addLayer(upBtn);

        // const trackStage: ILayer = new CVerticalSliderTrackStage({
        //     layerHost: this, viewport
        //         : this.viewport
        //     , model: this.model, layerParamsExtractor: (_layer) => this.getTrackStageLayerParams()
        // });
        // this.addLayer(trackStage);

        // const downBtn: ILayer = new CVerticalSliderButtonLayer({
        //     layerHost: this, viewport
        //         : this.viewport
        //     , model: this.model, layerParamsExtractor: () => this.getDownBtnLayerParams(), config: { direction: Direction.Down, callback: () => this.model.onSliderButtonIncrease() }
        // });
        // this.addLayer(downBtn);
    }
}