import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { DataRow } from '../../../../Database/Redux/JarvisDb/types/DataTypes';
import { CFlatGridModel } from '../CFlatGridModel';
import { TColumnData } from '../structures/TColumnData';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';

export class CFlatGridDataLayer extends AbstractCanvasLayer {

    protected model: CFlatGridModel;
    protected painter: CFlatGridPainter;

    private columnsData: TColumnData[];
    private rows: DataRow[];

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.setEvents();
    }

    private setEvents(): void {
        this.model.onMetadataDidChange$.subscribe(() => {
            this.columnsData = this.model.getColumnsData();
        });
        this.model.onDataDidChange$.subscribe(() => {
            this.rows = this.model.getData().rows;
            this.renderSelf();
            this.notifyRenderChanges();
        });
    }

    public onResize(): void {
        const layerParams: TLayerRenderParams = this.layerParamsExtractor(this);
        this.updateLayer(layerParams, false);
        this.updateParams();
        this.renderSelf();
    }

    protected renderSelf(): void {
        this.painter.drawDataCells(this.layerContext, this.getLayerRect(), this.rows, this.columnsData);
    };
}