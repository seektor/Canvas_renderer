import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CDigitalDisplayModel } from '../CDigitalDIsplayModel';
import { CDigitalDisplayBaseLayer } from '../layers/CDigitalDisplayBaseLayer';
import { CDigitalDisplayContentLayer } from '../layers/CDigitalDisplayContentLayer';
import { CDigitalDisplayPainter } from '../styles/CDigitalDisplayPainter';
import { CDigitalDisplayRotationStage } from './CDigitalDisplayRotationStage';

export class CDigitalDisplayMainStage extends AbstractCanvasStage {

    private readonly ringsDifference: number = 5;
    private readonly externalRingWidth: number = 6;
    private readonly rotatorWidth: number = 4;
    protected model: CDigitalDisplayModel;
    private painter: CDigitalDisplayPainter;
    private baseLayerRenderParams: TLayerRenderParams;

    constructor(params: TLayerParams<CDigitalDisplayModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.painter.setRenderProperties(this.externalRingWidth, this.rotatorWidth);
        this.updateParams();
        this.createLayers();
    }

    protected updateParams() {
        const lesserDimension: number = this.layerHeight <= this.layerWidth ? this.layerHeight : this.layerWidth;
        const dX: number = lesserDimension === this.layerHeight ? Math.round((this.layerWidth - lesserDimension) * 0.5) : 0;
        const dY: number = lesserDimension === this.layerHeight ? 0 : Math.round((this.layerHeight - lesserDimension) * 0.5);
        this.baseLayerRenderParams = {
            dX: dX,
            dY: dY,
            height: lesserDimension,
            width: lesserDimension
        }
    }

    protected renderSelfLayer() {
        this.model.getCanvasPainter().drawBackground(this.layerContext, this.getLayerRect());
    }

    private getRotatorLayerRenderParams(): TLayerRenderParams {
        const translation: number = this.externalRingWidth + this.ringsDifference;
        return {
            dX: this.baseLayerRenderParams.dX + translation,
            dY: this.baseLayerRenderParams.dY + translation,
            height: Math.max(0, this.baseLayerRenderParams.height - translation * 2),
            width: Math.max(0, this.baseLayerRenderParams.width - translation * 2)
        }
    }

    private getContentLayerRenderParams(): TLayerRenderParams {
        const rotatorInnerRadius: number = this.baseLayerRenderParams.width * 0.5 - this.externalRingWidth - this.ringsDifference - this.rotatorWidth;
        const squareHalfSide: number = rotatorInnerRadius * Math.cos(Math.PI * 0.25);
        const squareSide: number = squareHalfSide * 2;
        return {
            dX: this.baseLayerRenderParams.dX + (this.baseLayerRenderParams.width - squareSide) * 0.5,
            dY: this.baseLayerRenderParams.dY + (this.baseLayerRenderParams.height - squareSide) * 0.5,
            height: squareSide,
            width: squareSide
        }
    }

    protected createLayers(): void {
        const baseLayer: ILayer = new CDigitalDisplayBaseLayer({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: () => this.baseLayerRenderParams
        });
        this.addLayer(baseLayer);

        const rotationLayer: ILayer = new CDigitalDisplayRotationStage({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: () => this.getRotatorLayerRenderParams()
        });
        this.addLayer(rotationLayer);

        const contentLayer: ILayer = new CDigitalDisplayContentLayer({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: () => this.getContentLayerRenderParams()
        });
        this.addLayer(contentLayer);

    }
}