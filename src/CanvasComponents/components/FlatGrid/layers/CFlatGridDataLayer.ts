import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CFlatGridModel } from '../CFlatGridModel';
import { CFlatGridViewport } from '../CFlatGridViewport';
import { TColumnData } from '../structures/TColumnData';
import { TColumnResizeDataLayerData } from '../structures/TColumnResizeDataLayerData';
import { TDataFrame } from '../structures/TDataFrame';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';

export class CFlatGridDataLayer extends AbstractCanvasLayer {

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;
    protected canvasPainter: CFlatGridPainter;

    private columnsData: TColumnData[];
    private dataFrame: TDataFrame;
    private columnResizeData: TColumnResizeDataLayerData | null;

    constructor(params: TLayerParams<CFlatGridModel, CFlatGridViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.dataFrame = { from: 0, to: 0, rows: [] };
        this.columnsData = [];
        this.columnResizeData = null;
        this.setEvents();
    }

    private setEvents(): void {
        this.model.onMetadataDidChange$.subscribe(() => {
            this.columnsData = this.model.getColumnsData();
            this.onResize();
        });
        this.model.onDataDidChange$.subscribe(() => {
            this.dataFrame = this.model.getData();
            this.renderSelf();
            this.notifyRenderChanges();
        });
        this.model.onColumnWidthDidChange$.subscribe(() => {
            this.redrawResizedColumn();
            this.notifyRenderChanges();
        });
        this.viewport.onColumnResizeDidStart$.subscribe((columnId) => {
            this.onColumnResizeDidStart(columnId);
        });
        this.viewport.onColumnResizeDidEnd$.subscribe((columnId) => {
            this.onColumnResizeDidEnd();
        });
        this.viewport.onDataTopDidChange$.subscribe((top) => {
            this.onDataTopDidChange(top);
        });
        this.viewport.onDataLeftDidChange$.subscribe((top) => {
            this.onDataLeftDidChange(top);
        });
    }

    private onDataTopDidChange(top: number): void {
        this.sY = top;
        this.notifyRenderChanges();
    }

    private onDataLeftDidChange(left: number): void {
        this.sX = left;
        this.notifyRenderChanges();
    }

    private onColumnResizeDidStart(columnId: string): void {
        const columnIndex: number = this.columnsData.findIndex(column => column.id === columnId);
        const column: TColumnData = this.columnsData[columnIndex];
        let leftWidth: number = 0;
        let rightWidth: number = 0;
        for (let i = 0; i < columnIndex; i++) {
            leftWidth += this.columnsData[i].width;
        }
        for (let i = columnIndex + 1; i < this.columnsData.length; i++) {
            rightWidth += this.columnsData[i].width;
        }
        const leftBuffer: HTMLCanvasElement = document.createElement('canvas');
        leftBuffer.width = leftWidth;
        leftBuffer.height = this.layerHeight;
        leftBuffer.getContext('2d').drawImage(this.layer, 0, 0, leftWidth, this.layerHeight, 0, 0, leftBuffer.width, leftBuffer.height);
        const rightBuffer: HTMLCanvasElement = document.createElement('canvas');
        rightBuffer.width = rightWidth;
        rightBuffer.height = this.layerHeight;
        rightBuffer.getContext('2d').drawImage(this.layer, leftWidth + column.width, 0, rightWidth, this.layerHeight, 0, 0, rightBuffer.width, rightBuffer.height);
        this.columnResizeData = {
            column,
            leftBuffer,
            rightBuffer,
        }
    }

    private onColumnResizeDidEnd(): void {
        this.columnResizeData = null;
    }

    private redrawResizedColumn(): void {
        this.clear();
        this.canvasPainter.drawResizedColumn(this.layerContext, this.getLayerRect(), this.columnResizeData, this.dataFrame);
    }

    protected renderSelf(): void {
        this.clear();
        const dataWidth: number = this.viewport.getTotalHeaderWidth();
        const dataRect: TRect = { ...this.getLayerRect(), width: dataWidth };
        this.canvasPainter.drawDataCells(this.layerContext, dataRect, this.columnsData, this.dataFrame);
    };
}