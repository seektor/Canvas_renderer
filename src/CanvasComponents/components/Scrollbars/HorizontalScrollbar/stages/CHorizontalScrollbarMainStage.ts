import { AbstractCanvasMainStage } from '../../../../../CanvasRenderer/AbstractCanvasMainStage';
import { ILayer } from '../../../../../CanvasRenderer/interfaces/ILayer';
import { Direction } from '../../../../../CanvasRenderer/structures/Direction';
import { TDimensions } from '../../../../../CanvasRenderer/structures/TDimensions';
import { TLayerParams } from '../../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRect } from '../../../../../CanvasRenderer/structures/TLayerRect';
import { TLayerRenderParams } from '../../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CHorizontalScrollbarModel } from '../CHorizontalScrollbarModel';
import { CHorizontalScrollbarViewport } from '../CHorizontalScrollbarViewport';
import { CHorizontalScrollbarBackgroundLayer } from '../layers/CHorizontalScrollbarBackgroundLayer';
import { CHorizontalScrollbarButtonLayer } from '../layers/CHorizontalScrollbarButtonLayer';
import { CHorizontalScrollbarPainter } from '../styles/CHorizontalScrollbarPainter';
import { CHorizontalScrollbarTrackStage } from './CHorizontalScrollbarTrackStage';

export class CHorizontalScrollbarMainStage extends AbstractCanvasMainStage {

    protected model: CHorizontalScrollbarModel;
    protected viewport: CHorizontalScrollbarViewport;
    protected canvasPainter: CHorizontalScrollbarPainter;

    constructor(params: TLayerParams<CHorizontalScrollbarModel, CHorizontalScrollbarViewport, unknown>) {
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
            height: displayRect.height,
            width: displayRect.height
        }
    }

    private getLeftButtonLayerParams(): TLayerRenderParams {
        const buttonDimensions: TDimensions = this.getButtonDimensions();
        return { dX: 0, dY: 0, ...buttonDimensions };
    }

    private getRightButtonLayerParams(): TLayerRenderParams {
        const buttonDimensions: TDimensions = this.getButtonDimensions();
        return { dX: Math.max(this.layerWidth - buttonDimensions.width, 0), dY: 0, ...buttonDimensions };
    }

    private getTrackStageLayerParams(): TLayerRenderParams {
        const btnDimensions: TDimensions = this.getButtonDimensions();
        const borderWidth: number = this.canvasPainter.getScrollbarBorderWidth();
        return ({
            dX: btnDimensions.width,
            dY: 0 + borderWidth,
            width: this.layerWidth - 2 * btnDimensions.width,
            height: this.layerHeight - 2 * borderWidth
        })
    }

    protected createLayers(): void {
        const baseLayer: ILayer = new CHorizontalScrollbarBackgroundLayer({
            layerHost: this,
            viewport: this.viewport
            , model: this.model, layerParamsExtractor: (_layer) => this.getMainStageLayerParams()
        });
        this.addLayer(baseLayer);

        const leftButton: ILayer = new CHorizontalScrollbarButtonLayer({
            layerHost: this,
            viewport: this.viewport
            , model: this.model, layerParamsExtractor: () => this.getLeftButtonLayerParams(), config: { direction: Direction.Left, callback: () => this.model.onScrollbarDecreaseButton() }
        });
        this.addLayer(leftButton);

        const trackStage: ILayer = new CHorizontalScrollbarTrackStage({
            layerHost: this, viewport
                : this.viewport
            , model: this.model, layerParamsExtractor: (_layer) => this.getTrackStageLayerParams()
        });
        this.addLayer(trackStage);

        const rightButton: ILayer = new CHorizontalScrollbarButtonLayer({
            layerHost: this, viewport
                : this.viewport
            , model: this.model, layerParamsExtractor: () => this.getRightButtonLayerParams(), config: { direction: Direction.Right, callback: () => this.model.onScrollbarIncreaseButton() }
        });
        this.addLayer(rightButton);
    }
}