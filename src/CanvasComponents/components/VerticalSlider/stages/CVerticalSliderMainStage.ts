import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { TLayer } from '../../../../CanvasRenderer/structures/TLayer';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { CRectBaseLayer } from '../../../testLayers/RectBaseLayer/CRectBaseLayer';
import Colors from '../../../../UIHelpers/Colors';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderBaseLayer } from '../layers/CVerticalSliderBaseLayer';

export class CVerticalSliderMainStage extends AbstractCanvasStage {

    protected model: CVerticalSliderModel;

    constructor(layerHost: ILayerHost, model: CVerticalSliderModel, params: TLayer) {
        super(layerHost, model, params);
        this.createLayers();
        this.renderSelf();
    }

    public onResize(): void {
        this.updateLayer(this.model.getDisplayRect(), true);
        super.onResize();
    }

    protected createLayers(): void {
        const baseLayer: ILayer = new CVerticalSliderBaseLayer(this, this.model, this.model.getDisplayRect());
        this.addLayer(baseLayer);
    }
}