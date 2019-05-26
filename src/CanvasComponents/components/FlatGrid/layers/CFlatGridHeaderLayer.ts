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
    private contentWidth: number;
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
            this.onLayerDidResize();
            this.renderSelf();
            this.notifyRenderChanges();
        });
    }

    protected onLayerDidResize(): void {
        this.columnsData = this.model.getColumnsData();
        this.contentWidth = this.viewport.calculateHeaderWidth();
    }

    public renderSelf(): void {
        this.clear();
        this.canvasPainter.drawHeader(this.layerContext, { y: 0, x: 0, height: this.layerHeight, width: this.contentWidth }, this.shadowHeight, this.columnsData);
    }

    public isPierced(coords: TCoords): boolean {
        return this.isBetween(coords.x, this.sX, this.sX + this.sWidth) && this.isBetween(coords.y, this.sY, this.sY + this.sHeight - this.shadowHeight);
    }

    public onActionStart(coords: TCoords): void {
        const column: TColumnData | null = this.getResizableColumn(coords);
        this.columnResizeData = column ? { columnIndex: this.columnsData.indexOf(column), initialWidth: column.width } : null;
    }

    public onActionDrag(deltas: TDeltas) {
        if (this.columnResizeData) {
            const newWidth: number = this.columnResizeData.initialWidth + deltas.dX;
            this.model.setColumnWidth(this.columnResizeData.columnIndex, newWidth);
            this.renderSelf();
            this.notifyRenderChanges();
        }
    }

    public onActionEnd(): void {
        this.columnResizeData = null;
    }

    public onActionMove(coords: TCoords): void {
        if (this.getResizableColumn(coords)) {
            this.viewport.setCursor(CursorType.ColResize);
        } else {
            this.viewport.setCursor(CursorType.Auto);
        }
    }

    public onActionLeave() {
        this.viewport.setCursor(CursorType.Auto);
    }

    public onViewportLeave() {
        this.onActionLeave();
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

