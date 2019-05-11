import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import ThemingService from '../../../../app/services/themingService/ThemingService';
import { Constants } from '../../../../app/utils/Constants';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TCanvasStyles } from '../../../../CanvasRenderer/utils/painter/structures/TCanvasStyles';
import { TColumnData } from '../structures/TColumnData';
import { TFlatGridStyles } from './TFlatGridStyles';

export class CFlatGridPainter extends CanvasBasePainter {

    private styles: TFlatGridStyles;
    private readonly headerLineWidth: number = 2;
    private readonly headerBottomSeparatorWidth: number = 4;
    private readonly cellHorizontalPadding: number = 25;
    private readonly truncationSymbol: string = '...';

    constructor() {
        super();
        this.applyTheme();
    }

    private applyTheme() {
        const theme: TThemeStyles = ThemingService.getTheme();
        this.styles = {
            colorBackground: theme.colorBackgroundDarker,
            colorHeaderMain: theme.colorPrimary
        }
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }

    public drawHeader(ctx: CanvasRenderingContext2D, rect: TRect, shadowHeight: number, columnsData: TColumnData[]): void {
        const effectiveRect: TRect = { ...rect, height: Math.round(rect.height - shadowHeight * 1.5) };
        const headerFrameRect: TRect = {
            width: Math.round(rect.width - this.headerLineWidth * 0.5),
            height: (rect.height - this.headerLineWidth * 0.5 - shadowHeight * 1.5),
            x: rect.x + this.headerLineWidth * 0.5,
            y: rect.y + this.headerLineWidth * 0.5
        };
        this.fillRect(ctx, effectiveRect, { fillStyle: this.styles.colorBackground });
        this.strokeRect(ctx, headerFrameRect, {
            lineWidth: this.headerLineWidth, strokeStyle: this.styles.colorHeaderMain
        });
        this.drawLines(ctx, [{ x: 0, y: effectiveRect.height }, { x: effectiveRect.width, y: effectiveRect.height }], {
            lineWidth: shadowHeight,
            shadowBlur: 4,
            shadowColor: this.styles.colorHeaderMain,
            shadowOffsetY: shadowHeight * 0.5,
            strokeStyle: this.styles.colorHeaderMain
        })
        this.drawHeaderCells(ctx, effectiveRect, columnsData);
    }

    private drawHeaderCells(ctx: CanvasRenderingContext2D, rect: TRect, columnsData: TColumnData[]): void {
        const styles: Partial<TCanvasStyles> = {
            lineWidth: this.headerLineWidth,
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

}