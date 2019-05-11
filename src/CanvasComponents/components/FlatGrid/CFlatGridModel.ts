import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { TableMetadata } from '../../../Database/Redux/JarvisDb/types/DataTypes';
import { TColumnData } from './structures/TColumnData';
import { CFlatGridPainter } from './styles/CFLatGridPainter';

export class CFlatGridModel extends AbstractCanvasModel {

    private readonly baseColumnWidth: number = 250;
    private readonly minColumnWidth: number = 100;

    protected canvasPainter: CFlatGridPainter;
    private columnsData: TColumnData[];
    private rowCount: number;

    constructor() {
        super();
    }

    public getCanvasPainter(): CFlatGridPainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CFlatGridPainter();
        }
        return this.canvasPainter;
    }

    public getColumnsData(): TColumnData[] {
        return this.columnsData;
    }

    public setMetadata(data: TableMetadata): void {
        this.rowCount = data.rowCount;
        this.columnsData = data.fields.map(field => {
            return {
                ...field,
                width: this.baseColumnWidth
            }
        });
    }

    public calculateHeaderWidth(): number {
        return this.columnsData.reduce((p, c) => p += c.width, 0);
    }

    public setColumnWidth(columnIndex: number, width: number): void {
        const column: TColumnData = this.columnsData[columnIndex];
        column.width = Math.max(this.minColumnWidth, width);
    }
}