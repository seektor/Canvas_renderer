import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import { Constants } from '../../../../app/utils/Constants';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TCanvasStyles } from '../../../../CanvasRenderer/utils/painter/structures/TCanvasStyles';
import { DataRow, DataType } from '../../../../Database/Redux/JarvisDb/types/DataTypes';
import { TColumnData } from '../structures/TColumnData';
import { TColumnResizeDataLayerData } from '../structures/TColumnResizeDataLayerData';
import { TDataFrame } from '../structures/TDataFrame';
import { TFlatGridStyles } from './TFlatGridStyles';

export class CFlatGridPainter extends CanvasBasePainter {

    private styles: TFlatGridStyles;
    private readonly headerCellLineWidth: number = 2;
    private readonly dataCellLineWidth: number = 1;
    private readonly cellHorizontalPadding: number = 25;
    private readonly truncationSymbol: string = '...';
    private readonly rowHeight: number;

    constructor(theme: TThemeStyles, rowHeight: number) {
        super();
        this.applyTheme(theme);
        this.rowHeight = rowHeight;
    }

    public applyTheme(theme: TThemeStyles) {
        this.styles = {
            colorBackground: theme.colorBackgroundDark,
            colorHeaderMain: theme.colorPrimary,
            colorDataCellBorder: theme.colorPrimary,
            colorEvenRow: theme.colorPrimaryDark,
            colorOddRow: theme.colorPrimaryDarker
        }
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }

    public drawHeader(ctx: CanvasRenderingContext2D, rect: TRect, layerBottomOffset: number, columnsData: TColumnData[]): void {
        const effectiveRect: TRect = { ...rect, height: Math.round(rect.height - layerBottomOffset) };
        this.fillRect(ctx, effectiveRect, { fillStyle: this.styles.colorBackground });
        this.drawHeaderCells(ctx, effectiveRect, layerBottomOffset, columnsData);
    }

    private drawHeaderCells(ctx: CanvasRenderingContext2D, rect: TRect, layerBottomOffset: number, columnsData: TColumnData[]): void {
        const styles: Partial<TCanvasStyles> = {
            lineWidth: this.headerCellLineWidth,
            strokeStyle: this.styles.colorHeaderMain,
            fillStyle: this.styles.colorHeaderMain,
            textAlign: "center",
            font: this.getFontStyle(Constants.fontMain, rect.height * 0.5, 'bold'),
            textBaseline: "middle"
        }
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        let currentX: number = 0;
        let currentCellCenter: TCoords = { x: 0, y: rect.height * 0.5 + 2 };
        const truncationSymbolWidth: number = ctx.measureText(this.truncationSymbol).width;
        columnsData.forEach(column => {
            ctx.strokeRect(currentX, rect.y, column.width, rect.height);
            currentCellCenter.x = Math.round(currentX + column.width * 0.5);
            const maxWidth: number = column.width - this.cellHorizontalPadding * 2;
            const processedText: string = this.truncateTextPure(ctx, column.name, maxWidth, this.truncationSymbol, truncationSymbolWidth);
            ctx.fillText(processedText, currentCellCenter.x, currentCellCenter.y);
            currentX += column.width;
        });

        this.strokeLines(ctx, [{ x: 0, y: rect.height }, { x: currentX, y: rect.height }], {
            lineWidth: this.headerCellLineWidth * 2,
            shadowBlur: 5,
            shadowColor: this.styles.colorHeaderMain,
            shadowOffsetY: layerBottomOffset * 0.25,
            strokeStyle: this.styles.colorHeaderMain
        });

        this.applyStyles(ctx, savedStyles);
    }

    public drawDataCells(ctx: CanvasRenderingContext2D, rect: TRect, columnsData: TColumnData[], dataFrame: TDataFrame) {
        const styles: Partial<TCanvasStyles> = this.getDataCellsStyles();
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        const initialX: number = this.getLineWidthDelta(this.dataCellLineWidth);
        const initialY: number = initialX;
        let currentX: number = initialX;
        const truncationSymbolWidth: number = ctx.measureText(this.truncationSymbol).width;
        const rowCount: number = dataFrame.rows.length;
        this.drawStripes(ctx, rect, dataFrame.from, rowCount);
        const rows: DataRow[] = dataFrame.rows;
        const leftBorderLineX: number = rect.x + this.dataCellLineWidth % 2 === 0 ? 0 : 0.5;
        this.strokeLines(ctx, [{ x: leftBorderLineX, y: rect.y }, { x: leftBorderLineX, y: rect.y + rect.height }], styles);
        for (let columnIndex: number = 0; columnIndex < columnsData.length; columnIndex++) {
            const column: TColumnData = columnsData[columnIndex];
            const maxCellContentWidth: number = column.width - 2 * this.cellHorizontalPadding;
            const centerX: number = currentX + column.width * 0.5;
            let currentY: number = initialY;
            for (let rowIndex: number = 0; rowIndex < rowCount; rowIndex++) {
                this.drawDataCellPure(ctx, currentX, currentY, centerX, column, rows[rowIndex][column.id], maxCellContentWidth, truncationSymbolWidth)
                currentY += this.rowHeight;
            }
            currentX += column.width;
        }
        this.applyStyles(ctx, savedStyles);
    }

    private drawDataCellPure(ctx: CanvasRenderingContext2D, x: number, y: number, centerX: number, column: TColumnData, rawValue: unknown, maxCellContentWidth: number, truncationSymbolWidth: number): void {
        ctx.strokeRect(x, y, column.width, this.rowHeight);
        const formattedText: string = this.getFormattedCellValue(rawValue, column.dataType);
        const truncatedText: string = this.truncateTextPure(ctx, formattedText, maxCellContentWidth, this.truncationSymbol, truncationSymbolWidth);
        const centerY: number = y + this.rowHeight * 0.5 + this.headerCellLineWidth;
        ctx.fillText(truncatedText, centerX, centerY);
    }

    private getDataCellsStyles(): Partial<TCanvasStyles> {
        return {
            lineWidth: 1,
            strokeStyle: this.styles.colorDataCellBorder,
            fillStyle: this.styles.colorDataCellBorder,
            textAlign: "center",
            font: this.getFontStyle(Constants.fontMain, this.rowHeight * 0.5),
            textBaseline: "middle"
        }
    }

    private getLineWidthDelta(lineWidth: number): number {
        return lineWidth % 2 === 0 ? 0 : -0.5;
    }

    public drawResizedColumn(ctx: CanvasRenderingContext2D, rect: TRect, columnResizeData: TColumnResizeDataLayerData, dataFrame: TDataFrame): void {
        const styles: Partial<TCanvasStyles> = this.getDataCellsStyles();
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        const initialX: number = this.getLineWidthDelta(this.dataCellLineWidth);
        const initialY: number = initialX;
        const columnX: number = initialX + columnResizeData.leftBuffer.width;
        columnResizeData.leftBuffer.width && ctx.drawImage(columnResizeData.leftBuffer, 0, 0);
        columnResizeData.rightBuffer.width && ctx.drawImage(columnResizeData.rightBuffer, columnResizeData.leftBuffer.width + columnResizeData.column.width, 0);

        const columnWidth: number = columnResizeData.column.width;
        const rowCount: number = dataFrame.rows.length;
        this.drawStripes(ctx, { x: columnX, y: 0, width: columnWidth, height: rect.height }, dataFrame.from, rowCount);

        this.applyStyles(ctx, styles);
        const centerX: number = columnX + columnWidth * 0.5;
        const column: TColumnData = columnResizeData.column;
        const maxCellContentWidth: number = column.width - 2 * this.cellHorizontalPadding;
        const truncationSymbolWidth: number = ctx.measureText(this.truncationSymbol).width;
        for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
            const currentY: number = initialY + rowIndex * this.rowHeight;
            const rawValue: unknown = dataFrame.rows[rowIndex][column.id];
            this.drawDataCellPure(ctx, columnX, currentY, centerX, column, rawValue, maxCellContentWidth, truncationSymbolWidth);
        }
        const leftBorderLineX: number = rect.x + this.dataCellLineWidth % 2 === 0 ? 0 : 0.5;
        this.strokeLines(ctx, [{ x: leftBorderLineX, y: rect.y }, { x: leftBorderLineX, y: rect.y + rect.height }], styles);
        this.applyStyles(ctx, savedStyles);
    }

    private drawStripes(ctx: CanvasRenderingContext2D, rect: TRect, fromRowNumber: number, rowCount: number): void {
        const initialFillStyles: string = ctx.fillStyle as string;
        let currentY: number = 0;
        const toRowNumber: number = fromRowNumber + rowCount;
        for (let rowNumber = fromRowNumber; rowNumber < toRowNumber; rowNumber++) {
            ctx.fillStyle = rowNumber % 2 === 0 ? this.styles.colorEvenRow : this.styles.colorOddRow;
            ctx.fillRect(rect.x, currentY, rect.width, this.rowHeight);
            currentY += this.rowHeight;
        }
        ctx.fillStyle = initialFillStyles;
    }

    private getFormattedCellValue(value: unknown, dataType: DataType): string {
        switch (dataType) {
            case DataType.Boolean:
                return (value as boolean).toString();
            case DataType.Date:
            case DataType.Number:
                return (value as number).toString();
            case DataType.String:
                return value as string;
        }
    }

}