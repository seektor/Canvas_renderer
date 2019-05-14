import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import ThemingService from '../../../../app/services/themingService/ThemingService';
import { Constants } from '../../../../app/utils/Constants';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TCanvasStyles } from '../../../../CanvasRenderer/utils/painter/structures/TCanvasStyles';
import { DataRow } from '../../../../Database/Redux/JarvisDb/types/DataTypes';
import { TColumnData } from '../structures/TColumnData';
import { TFlatGridStyles } from './TFlatGridStyles';

export class CFlatGridPainter extends CanvasBasePainter {

    private styles: TFlatGridStyles;
    private readonly headerCellLineWidth: number = 2;
    private readonly dataCellLineWidth: number = 1;
    private readonly cellHorizontalPadding: number = 25;
    private readonly truncationSymbol: string = '...';
    private rowHeight: number;

    constructor(rowHeight: number) {
        super();
        this.rowHeight = rowHeight;
        this.applyTheme();
    }

    private applyTheme() {
        const theme: TThemeStyles = ThemingService.getTheme();
        this.styles = {
            colorBackground: theme.colorBackgroundDarker,
            colorHeaderMain: theme.colorPrimary,
            colorDataCellBorder: theme.colorPrimary
        }
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }

    public drawHeader(ctx: CanvasRenderingContext2D, rect: TRect, shadowHeight: number, columnsData: TColumnData[]): void {
        const effectiveRect: TRect = { ...rect, height: Math.round(rect.height - shadowHeight * 1.5) };
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
        this.drawLines(ctx, [{ x: 0, y: effectiveRect.height }, { x: effectiveRect.width, y: effectiveRect.height }], {
            lineWidth: shadowHeight,
            shadowBlur: 4,
            shadowColor: this.styles.colorHeaderMain,
            shadowOffsetY: shadowHeight,
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

    public drawDataCells(ctx: CanvasRenderingContext2D, rect: TRect, rows: DataRow[], columnsData: TColumnData[]) {
        const styles: Partial<TCanvasStyles> = {
            lineWidth: 1,
            strokeStyle: this.styles.colorDataCellBorder,
            textAlign: "center",
            font: this.getFontStyle(Constants.fontMain, rect.height * 0.5),
            textBaseline: "middle"
        }
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        let currentX: number = 0;
        let currentY: number = 0;
        [1].forEach(() => {
            currentX = 0;
            columnsData.forEach((column: TColumnData) => {
                this.strokeRectPure(ctx, { height: this.rowHeight, width: column.width, x: currentX, y: currentY });
                currentX += column.width;
            });
            currentY += Math.floor(this.rowHeight);
        });

        this.drawLines(ctx, [{ y: 50 - 0.5, x: 0 }, { y: 50 - 0.5, x: 500 }], styles);
        styles.lineWidth = 2;
        this.drawLines(ctx, [{ y: 70, x: 0 }, { y: 70, x: 500 }], styles);

        this.applyStyles(ctx, savedStyles);
    }

}