import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CursorType } from '../../../../CanvasRenderer/structures/CursorType';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TDeltas } from '../../../../CanvasRenderer/structures/TDeltas';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CFlatGridModel } from '../CFlatGridModel';
import { CFlatGridViewport } from '../CFlatGridViewport';
import { TColumnData } from '../structures/TColumnData';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';

export class CFlatGridHeaderLayer extends AbstractCanvasLayer {

    private readonly shadowHeight: number;
    private readonly resizeHorizontalTriggerWidth: number = 5;

    protected model: CFlatGridModel;
    protected viewport: CFlatGridViewport;
    private canvasPainter: CFlatGridPainter;
    private columnsData: TColumnData[];
    private columnResizeData: { columnIndex: number, initialWidth: number } | null = null;

    constructor(params: TLayerParams<CFlatGridModel, CFlatGridViewport, unknown>, shadowOffset: number) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.shadowHeight = shadowOffset;
        this.setEvents();
        this.onLayerDidResize();
    }

    private setEvents(): void {
        this.model.onMetadataDidChange$.subscribe(() => {
            this.columnsData = this.model.getColumnsData();
            this.renderSelf();
            this.notifyRenderChanges();
        });
        this.model.onColumnWidthDidChange$.subscribe(() => {
            this.renderSelf();
            this.notifyRenderChanges();
        });
        this.viewport.onDataLeftDidChange$.subscribe((top) => {
            this.onDataLeftDidChange(top);
        });
    }

    public renderSelf(): void {
        this.clear();
        this.canvasPainter.drawHeader(this.layerContext, { y: 0, x: 0, height: this.layerHeight, width: this.layerWidth }, this.shadowHeight, this.columnsData);
    }

    public isPierced(coords: TCoords): boolean {
        return this.isBetween(coords.x, this.sX, this.sX + this.sWidth) && this.isBetween(coords.y, this.sY, this.sY + this.sHeight - this.shadowHeight);
    }

    public onActionStart(coords: TCoords): void {
        const column: TColumnData | null = this.getResizableColumn(coords);
        if (column) {
            this.columnResizeData = { columnIndex: this.columnsData.indexOf(column), initialWidth: column.width };
            this.viewport.columnResizeDidStart$.next(column.id);
        }
    }

    public onActionDrag(deltas: TDeltas) {
        if (this.columnResizeData) {
            const newWidth: number = this.columnResizeData.initialWidth + deltas.dX;
            this.model.setColumnWidth(this.columnResizeData.columnIndex, newWidth);
        }
    }

    public onActionEnd(coords: TCoords): void {
        this.columnResizeData = null;
        if (!this.isPierced(coords)) {
            this.viewport.setCursor(CursorType.Auto);
        }
        this.viewport.columnResizeDidEnd$.next();
    }

    public onActionMove(coords: TCoords): void {
        if (this.columnResizeData) {
            return;
        }
        if (this.getResizableColumn(coords)) {
            this.viewport.setCursor(CursorType.ColResize);
        } else {
            this.viewport.setCursor(CursorType.Auto);
        }
    }

    public onActionLeave() {
        if (this.columnResizeData) {
            return;
        }
        this.viewport.setCursor(CursorType.Auto);
    }

    public onViewportLeave() {
        this.onActionLeave();
    }

    private onDataLeftDidChange(left: number): void {
        this.sX = left;
        this.notifyRenderChanges();
    }

    private getResizableColumn(coords: TCoords): TColumnData | null {
        let resizableColumn: TColumnData | null = null;
        let currentX: number = 0;
        for (let columnIndex: number = 0; columnIndex < this.columnsData.length; columnIndex++) {
            const column: TColumnData = this.columnsData[columnIndex];
            currentX += column.width;
            const isBetweenHorizontally: boolean = this.isBetween(coords.x, currentX - this.resizeHorizontalTriggerWidth, currentX + this.resizeHorizontalTriggerWidth);
            const isBetweenVertically: boolean = this.isBetween(coords.y, 0, this.layerHeight);
            if (isBetweenHorizontally && isBetweenVertically) {
                resizableColumn = this.columnsData[columnIndex];
                break;
            }
        }
        return resizableColumn;
    }

}

