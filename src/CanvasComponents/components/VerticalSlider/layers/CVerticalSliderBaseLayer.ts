import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { TLayer } from '../../../../CanvasRenderer/structures/TLayer';
import { BaseCanvasPainter } from '../../../../CanvasRenderer/utils/painter/BaseCanvasPainter';
import { TLayerRect } from '../../../../CanvasRenderer/structures/TLayerRect';

export class CVerticalSliderBaseLayer extends AbstractCanvasLayer {

    protected model: CVerticalSliderModel;
    private painter: BaseCanvasPainter;

    constructor(layerHost: ILayerHost, model: CVerticalSliderModel, params: TLayer) {
        super(layerHost, model, params);
        this.painter = this.model.getCanvasPainter();
        this.renderSelf();
    }

    public onResize() {
        const displayLayerRect: TLayerRect = this.model.getDisplayRect();
        this.updateLayer(displayLayerRect, true);
        this.renderSelf();
    }

    public renderSelf(): void {
        this.painter.fillRect(this.layerContext, { height: this.layerHeight, width: this.layerWidth, x: 0, y: 0 }, {
            fillStyle: "blue"
        });
    }
}