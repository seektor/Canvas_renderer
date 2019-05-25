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
    private readonly headerShadowHeight: number = 4;

    constructor(params: TLayerParams<CFlatGridModel, CFlatGridViewport, unknown>) {
        super(params);
        this.painter = this.viewport.getCanvasPainter();
        this.createLayers();
    }

    private getHeaderLayerParams(layer: ILayer): TLayerRenderParams {
        const headerWidth: number = this.viewport.calculateHeaderWidth();
        return {
            dX: this.dX,
            dY: this.dY,
            height: this.viewport.getHeaderHeight() + this.headerShadowHeight,
            width: Math.max(headerWidth, this.layerWidth),
            sWidth: Math.min(headerWidth, this.layerWidth),
            dWidth: Math.min(headerWidth, this.layerWidth),
        }
    }

    private getDataLayerParams(layer: ILayer): TLayerRenderParams {
        const headerWidth: number = this.viewport.calculateHeaderWidth();
        const totalRowsHeight: number = this.viewport.getTotalRowsHeight();
        const displayHeight: number = this.viewport.getDataLayerDisplayHeight();
        const displayWidth: number = this.layerWidth;
        const sHeight: number = Math.min(totalRowsHeight, displayHeight);
        const sWidth: number = Math.min(displayWidth, headerWidth);
        return {
            dX: 0,
            dY: this.viewport.getHeaderHeight(),
            height: this.viewport.getRowBufferHeight(),
            width: Math.max(headerWidth, this.layerWidth),
            sHeight,
            sWidth,
            dHeight: sHeight,
            dWidth: sWidth
        }
    }

    protected createLayers(): void {
        const headerLayer: ILayer = new CFlatGridHeaderLayer({
            layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: (layer) => this.getHeaderLayerParams(layer)
        }, this.headerShadowHeight);
        this.addLayer(headerLayer);

        const flatGridDataLayer: ILayer = new CFlatGridDataLayer({ layerHost: this, viewport: this.viewport, model: this.model, layerParamsExtractor: (layer) => this.getDataLayerParams(layer) });
        this.addLayer(flatGridDataLayer);
    }
}