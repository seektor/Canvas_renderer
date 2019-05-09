import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayerHost } from '../../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { CVerticalSliderModel } from '../CVerticalSliderModel';
import { CVerticalSliderBaseLayer } from '../layers/CVerticalSliderBaseLayer';
import { ILayerParamsExtractor } from '../../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { TLayerRect } from '../../../../CanvasRenderer/structures/TLayerRect';
import { CVerticalSliderButtonLayer } from '../layers/CVerticalSliderButtonLayer';
import { TDimensions } from '../../../../CanvasRenderer/structures/TDimensions';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { CVerticalSliderTrackStage } from './CVerticalSliderTrackStage';
import { CVerticalSliderPainter } from '../styles/CVerticalSliderPainter';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';

export class CVerticalSliderMainStage extends AbstractCanvasStage {

    protected model: CVerticalSliderModel;
    protected painter: CVerticalSliderPainter;

    constructor(params: TLayerParams<CVerticalSliderModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
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

    private getButtonDimensions(): TDimensions {
        const displayRect: TLayerRect = this.model.getDisplayRect();
        return {
            height: displayRect.width,
            width: displayRect.width
        }
    }

    protected createLayers(): void {
        const baseLayer: ILayer = new CVerticalSliderBaseLayer({ layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: (_layer) => this.getMainStageLayerParams() });
        this.addLayer(baseLayer);

        const btnDimensions: TDimensions = this.getButtonDimensions();

        const upBtn: ILayer = new CVerticalSliderButtonLayer({ layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: () => ({ dX: 0, dY: 0, ...btnDimensions }), config: { direction: Direction.Up, callback: () => console.log("xD") } });
        this.addLayer(upBtn);

        const borderWidth: number = this.painter.getSliderBorderWidth(this.layerWidth);

        const trackStage: ILayer = new CVerticalSliderTrackStage({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: (_layer) => ({
                dX: borderWidth,
                dY: btnDimensions.height,
                width: this.layerWidth - 2 * borderWidth,
                height: this.layerHeight - 2 * btnDimensions.height
            })
        });
        this.addLayer(trackStage);

        const downBtn: ILayer = new CVerticalSliderButtonLayer({ layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: () => ({ dX: 0, dY: this.layerHeight - btnDimensions.height, ...btnDimensions }), config: { direction: Direction.Down, callback: () => console.log("xD") } });
        this.addLayer(downBtn);

    }
}