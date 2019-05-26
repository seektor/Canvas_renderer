import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import { Constants } from '../../../../app/utils/Constants';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TCanvasStyles } from '../../../../CanvasRenderer/utils/painter/structures/TCanvasStyles';
import { DataRow, DataType } from '../../../../Database/Redux/JarvisDb/types/DataTypes';
import { TColumnData } from '../structures/TColumnData';
import { TDataFrame } from '../structures/TDataFrame';
import { TFlatGridStyles } from './TFlatGridStyles';

export class CFlatGridPainter extends CanvasBasePainter {

    private styles: TFlatGridStyles;
    private readonly rowHeight: number = 25;
    private readonly headerCellLineWidth: number = 2;
    private readonly dataCellLineWidth: number = 1;
    private readonly cellHorizontalPadding: number = 25;
    private readonly horizontalScrollHeight: number = 20;
    private readonly truncationSymbol: string = '...';

    constructor(theme: TThemeStyles) {
        super();
        this.applyTheme(theme);
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

    public getRowHeight(): number {
        return this.rowHeight;
    }

    public getHorizontalScrollHeight(): number {
        return this.horizontalScrollHeight;
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }

    public drawHeader(ctx: CanvasRenderingContext2D, rect: TRect, shadowOffset: number, columnsData: TColumnData[]): void {
        const effectiveRect: TRect = { ...rect, height: Math.round(rect.height - shadowOffset) };
        const headerFrameRect: TRect = {
            width: rect.width - this.headerCellLineWidth * 0.5,
            height: effectiveRect.height - this.headerCellLineWidth * 0.5,
            x: rect.x + this.headerCellLineWidth * 0.5,
            y: rect.y + this.headerCellLineWidth * 0.5
        };
        this.fillRect(ctx, effectiveRect, { fillStyle: this.styles.colorBackground });
        this.strokeRect(ctx, headerFrameRect, {
            lineWidth: this.headerCellLineWidth, strokeStyle: this.styles.colorHeaderMain
        });
        this.strokeLines(ctx, [{ x: 0, y: effectiveRect.height }, { x: effectiveRect.width, y: effectiveRect.height }], {
            lineWidth: this.headerCellLineWidth * 2,
            shadowBlur: 5,
            shadowColor: this.styles.colorHeaderMain,
            shadowOffsetY: shadowOffset * 0.25,
            strokeStyle: this.styles.colorHeaderMain
        })
        this.drawHeaderCells(ctx, effectiveRect, columnsData);
    }

    private drawHeaderCells(ctx: CanvasRenderingContext2D, rect: TRect, columnsData: TColumnData[]): void {
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
        let currentCellCenter: TCoords = { x: 0, y: rect.height * 0.5 };
        columnsData.forEach(column => {
            ctx.strokeRect(currentX, rect.y, column.width, rect.height);
            currentCellCenter.x = Math.round(currentX + column.width * 0.5);
            const maxWidth: number = column.width - this.cellHorizontalPadding * 2;
            const processedText: string = this.truncateTextPure(ctx, column.name, maxWidth, this.truncationSymbol);
            this.fillTextPure(ctx, processedText, currentCellCenter);
            currentX += column.width;
        })
        this.applyStyles(ctx, savedStyles);
    }

    public drawDataCells(ctx: CanvasRenderingContext2D, rect: TRect, columnsData: TColumnData[], dataFrame: TDataFrame) {
        const styles: Partial<TCanvasStyles> = {
            lineWidth: 1,
            strokeStyle: this.styles.colorDataCellBorder,
            fillStyle: this.styles.colorDataCellBorder,
            textAlign: "center",
            font: this.getFontStyle(Constants.fontMain, this.rowHeight * 0.5),
            textBaseline: "middle"
        }
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        const initialX: number = this.dataCellLineWidth % 2 === 0 ? 0 : 0.5;
        const initialY: number = initialX;
        let currentX: number = initialX;
        let currentY: number = initialY;
        let currentRowNumber = dataFrame.from;
        dataFrame.rows.forEach((row: DataRow) => {
            currentX = initialX;
            const rowColor: string = currentRowNumber % 2 === 0 ? this.styles.colorEvenRow : this.styles.colorOddRow;
            this.fillRect(ctx, { height: this.rowHeight, width: rect.width, x: currentX, y: currentY }, { fillStyle: rowColor });
            columnsData.forEach((column: TColumnData) => {
                this.strokeRectPure(ctx, { height: this.rowHeight, width: column.width, x: currentX, y: currentY });
                const maxCellContentWidth: number = column.width - 2 * this.cellHorizontalPadding;
                const formattedText: string = this.getFormattedCellValue(row[column.id], column.dataType);
                const truncatedText: string = this.truncateTextPure(ctx, formattedText, maxCellContentWidth, this.truncationSymbol);
                const centerX: number = currentX + column.width * 0.5;
                const centerY: number = currentY + this.rowHeight * 0.5 + this.headerCellLineWidth;
                this.fillTextPure(ctx, truncatedText, { x: centerX, y: centerY });
                currentX += column.width;
            });
            currentRowNumber++;
            currentY += Math.floor(this.rowHeight);
        });

        this.applyStyles(ctx, savedStyles);
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