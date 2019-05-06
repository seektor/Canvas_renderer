import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { BaseCanvasPainter } from '../../../CanvasRenderer/utils/painter/BaseCanvasPainter';
import { VerticalSliderCanvasPainter } from './styles/VerticalSliderCanvasPainter';
import VerticalSliderStyles from './styles/VerticalSliderStyles';
import { TVerticalSliderViewState } from './structures/TVerticalSliderViewState';
import { TDimensions } from '../../../CanvasRenderer/structures/TDimensions';
import { TLayerRect } from '../../../CanvasRenderer/structures/TLayerRect';

export class CVerticalSliderModel extends AbstractCanvasModel {

    protected canvasPainter: VerticalSliderCanvasPainter;
    private viewState: TVerticalSliderViewState;

    constructor() {
        super();
    }

    public getCanvasPainter(): VerticalSliderCanvasPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new VerticalSliderCanvasPainter(VerticalSliderStyles);
        }
        return this.canvasPainter;
    }

    public getViewState(): TVerticalSliderViewState {
        return this.viewState;
    }

    public onResize(): void {
        this.createViewState();
    }

    protected onViewportInit(): void {
        this.createViewState();
    }

    private createViewState(): void {
        const displayLayerRect: TDimensions = this.viewport.getDisplayLayerRect();
        const buttonHeight: number = displayLayerRect.width;
        const trackWidth: number = Math.round(displayLayerRect.width * 0.7);
        const trackLayerRect: TLayerRect = { dX: Math.round((displayLayerRect.width - trackWidth) * 0.5), dY: buttonHeight, width: trackWidth, height: displayLayerRect.height - 2 * buttonHeight }
        this.viewState = {
            topButtonRect: { dX: 0, dY: 0, width: displayLayerRect.width, height: buttonHeight },
            bottomButtonRect: { dX: 0, dY: displayLayerRect.height - buttonHeight, width: displayLayerRect.width, height: buttonHeight },
            handleRect: { dX: 0, dY: 0, width: trackLayerRect.width, height: 100 },
            sliderRect: { dX: 0, dY: 0, ...displayLayerRect },
            trackRect: trackLayerRect
        }
    }

}