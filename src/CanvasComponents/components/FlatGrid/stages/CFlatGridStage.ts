import { AbstractCanvasStage } from '../../../../CanvasRenderer/AbstractCanvasStage';
import { ILayer } from '../../../../CanvasRenderer/interfaces/ILayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CFlatGridModel } from '../CFlatGridModel';
import { CFlatGridDataLayer } from '../layers/CFlatGridDataLayer';
import { CFlatGridHeaderLayer } from '../layers/CFlatGridHeaderLayer';

export class CFlatGridStage extends AbstractCanvasStage {

    protected model: CFlatGridModel;
    private readonly headerShadowHeight: number = 4;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.createLayers();
        this.setDataDisplayHeight();
    }

    public onResize(): void {
        super.onResize();
        this.setDataDisplayHeight();
    }

    private setDataDisplayHeight(): void {
        const displayHeight: number = this.layerHeight - this.model.getHeaderHeight();
        this.model.setDisplayDataLayerHeight(displayHeight);
    }

    private getHeaderLayerParams(layer: ILayer): TLayerRenderParams {
        const headerWidth: number = this.model.calculateHeaderWidth();
        return {
            dX: this.dX,
            dY: this.dY,
            height: this.model.getHeaderHeight() + this.headerShadowHeight,
            width: Math.max(headerWidth, this.layerWidth),
            sWidth: Math.min(headerWidth, this.layerWidth),
            dWidth: Math.min(headerWidth, this.layerWidth),
        }
    }

    private getDataLayerParams(layer: ILayer): TLayerRenderParams {
        const headerWidth: number = this.model.calculateHeaderWidth();
        const totalRowsHeight: number = this.model.getTotalRowsHeight();
        const displayHeight: number = this.layerHeight - this.model.getHeaderHeight();
        const displayWidth: number = this.layerWidth;
        const sHeight: number = Math.min(totalRowsHeight, displayHeight);
        const sWidth: number = Math.min(displayWidth, headerWidth);
        return {
            dX: 0,
            dY: this.model.getHeaderHeight(),
            height: this.model.getRowBufferHeight(),
            width: Math.max(headerWidth, this.layerWidth),
            sHeight,
            sWidth,
            dHeight: sHeight,
            dWidth: sWidth
        }
    }

    protected createLayers(): void {
        const headerLayer: ILayer = new CFlatGridHeaderLayer({
            layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: (layer) => this.getHeaderLayerParams(layer)
        }, this.headerShadowHeight);
        this.addLayer(headerLayer);

        const flatGridDataLayer: ILayer = new CFlatGridDataLayer({ layerHost: this, globalViewport: this.globalViewport, model: this.model, layerParamsExtractor: (layer) => this.getDataLayerParams(layer) });
        this.addLayer(flatGridDataLayer);
    }
}