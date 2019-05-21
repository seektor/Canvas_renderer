import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TLayerRenderParams } from '../../../../CanvasRenderer/structures/TLayerRenderParams';
import { CFlatGridModel } from '../CFlatGridModel';
import { TColumnData } from '../structures/TColumnData';
import { TDataFrame } from '../structures/TDataFrame';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';

export class CFlatGridDataLayer extends AbstractCanvasLayer {

    protected model: CFlatGridModel;
    protected painter: CFlatGridPainter;

    private columnsData: TColumnData[];
    private dataFrame: TDataFrame;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.dataFrame = { from: 0, to: 0, rows: [] };
        this.columnsData = [];
        this.setEvents();
    }

    private setEvents(): void {
        this.model.onMetadataDidChange$.subscribe(() => {
            this.onResize();
            this.columnsData = this.model.getColumnsData();
        });
        this.model.onDataDidChange$.subscribe(() => {
            this.dataFrame = this.model.getData();
            this.renderSelf();
            this.notifyRenderChanges();
        });
        this.model.onDataDidTranslatedVertically$.subscribe(() => {

        })
    }

    public onResize(): void {
        const layerParams: TLayerRenderParams = this.layerParamsExtractor(this);
        this.updateLayer(layerParams, false);
        this.updateParams();
        this.renderSelf();
    }

    protected renderSelf(): void {
        this.clear();
        this.painter.drawDataCells(this.layerContext, this.getLayerRect(), this.dataFrame.rows, this.columnsData);
        this.notifyRenderChanges();
    };
}