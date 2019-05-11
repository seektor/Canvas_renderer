import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { CursorType } from '../../../../CanvasRenderer/structures/CursorType';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CFlatGridModel } from '../CFlatGridModel';
import { TColumnData } from '../structures/TColumnData';
import { CFlatGridPainter } from '../styles/CFLatGridPainter';

export class CFlatGridHeaderLayer extends AbstractCanvasLayer {

    private readonly shadowHeight: number = 4;
    private readonly resizeHorizontalTriggerWidth: number = 5;

    protected model: CFlatGridModel;
    private painter: CFlatGridPainter;
    private columnsData: TColumnData[];
    private contentWidth: number;

    constructor(params: TLayerParams<CFlatGridModel, unknown>) {
        super(params);
        this.painter = this.model.getCanvasPainter();
        this.updateParams();
        this.renderSelf();
    }

    protected updateParams(): void {
        this.columnsData = this.model.getColumnsData();
        this.contentWidth = this.model.calculateHeaderWidth();
    }

    public renderSelf(): void {
        this.painter.drawHeader(this.layerContext, { y: 0, x: 0, height: this.layerHeight, width: this.contentWidth }, this.shadowHeight, this.columnsData);
    }

    public isPierced(coords: TCoords): boolean {
        return this.isBetween(coords.x, this.sX, this.sX + this.sWidth) && this.isBetween(coords.y, this.sY, this.sY + this.sHeight - this.shadowHeight);
    }

    public onActionMove(coords: TCoords): void {
        if (this.isOnResizeAnchor(coords)) {
            this.globalViewport.setCursor(CursorType.ColResize);
        } else {
            this.globalViewport.setCursor(CursorType.Auto);
        }
    }

    public onActionOut() {
        this.globalViewport.setCursor(CursorType.Auto);
    }

    public onViewportOut() {
        this.onActionOut();
    }

    private isOnResizeAnchor(coords: TCoords): boolean {
        let currentX: number = 0;
        for (let columnIndex: number = 0; columnIndex < this.columnsData.length; columnIndex++) {
            const column: TColumnData = this.columnsData[columnIndex];
            currentX += column.width;
            const isBetweenHorizontally: boolean = this.isBetween(coords.x, currentX - this.resizeHorizontalTriggerWidth, currentX + this.resizeHorizontalTriggerWidth);
            const isBetweenVertically: boolean = this.isBetween(coords.y, 0, this.layerHeight);
            if (isBetweenHorizontally && isBetweenVertically) {
                return true;
            }
        }
        return false;
    }

    private getColumnFromCoords(coords: TCoords): TColumnData | undefined {
        let currentX: number = 0;
        return this.columnsData.find(column => {
            const isBetweenHorizontally: boolean = this.isBetween(coords.x, currentX, currentX + column.width);
            const isBetweenVertically: boolean = this.isBetween(coords.y, 0, this.layerHeight);
            if (isBetweenHorizontally && isBetweenVertically) {
                return true;
            }
        });
    }
}