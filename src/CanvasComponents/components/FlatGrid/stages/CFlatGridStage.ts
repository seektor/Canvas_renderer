import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CFlatGridModel } from '../CFlatGridModel';
import { CFlatGridViewport } from '../CFlatGridViewport';
import { CFlatGridDataLayer } from '../layers/CFlatGridDataLayer';
import { CFlatGridHeaderLayer } from '../layers/CFlatGridHeaderLayer';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';

export class CFlatGridStage extends AbstractCanvasStage {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;
    protected painter: CFlatGridPainter;
    private readonly headerShadowOffset: number = 10;

    constructor(params: TLayerParams<CFlatGridModel, CFlatGridViewport, unknown>) {
        super(params);
        this.painter = this.viewport.getCanvasPainter();
        this.createLayers();
    }

    private getHeaderLayerParams(layer: ILayer): TLayerRenderParams {
        const headerWidth: number = this.viewport.getTotalHeaderWidth();
        const layerHeight: number = this.viewport.getHeaderHeight() + this.headerShadowOffset;
        const isVerticalScrolllbarVisible: boolean = this.viewport.isVerticalScrollbarVisible();
        const layerRenderWidth: number = isVerticalScrolllbarVisible ? Math.max(this.layerWidth - this.viewport.getVerticalScrollbarWidth(), 0) : this.layerWidth;
        const layerWidth: number = Math.max(headerWidth, layerRenderWidth);
        return {
            dX: this.dX,
            dY: this.dY,
            height: layerHeight,
            width: layerWidth,
            sWidth: layerRenderWidth,
            dWidth: layerRenderWidth,
        }
    }

    private getDataLayerParams(layer: ILayer): TLayerRenderParams {
        const headerWidth: number = this.viewport.getTotalHeaderWidth();
        const bufferHeight: number = this.viewport.getRowBufferHeight();
        const layerRenderHeight: number = this.viewport.getDataLayerRenderHeight(this.viewport.isHorizontalScrollbarVisible());
        const layerHeight: number = Math.max(bufferHeight, layerRenderHeight);
        const layerRenderWidth: number = this.viewport.getDataLayerRenderWidth(this.viewport.isVerticalScrollbarVisible());
        const layerWidth: number = Math.max(headerWidth, layerRenderWidth);
        return {
            dX: 0,
            dY: this.viewport.getHeaderHeight(),
            height: layerHeight,
            width: layerWidth,
            sHeight: layerRenderHeight,
            sWidth: layerRenderWidth,
            dHeight: layerRenderHeight,
            dWidth: layerRenderWidth
        }
    }

    protected createLayers(): void {
        const flatGridDataLayer: ILayer = new CFlatGridDataLayer({ layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: (layer) => this.getDataLayerParams(layer) });
        this.addLayer(flatGridDataLayer);

        const headerLayer: ILayer = new CFlatGridHeaderLayer({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: (layer) => this.getHeaderLayerParams(layer)
        }, this.headerShadowOffset);
        this.addLayer(headerLayer);
    }
}