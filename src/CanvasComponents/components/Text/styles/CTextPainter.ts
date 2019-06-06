import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import { Constants } from '../../../../app/utils/Constants';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TFillText, TLineStyles } from '../../../../CanvasRenderer/utils/painter/structures/CanvasPainterTypes';
import { TCanvasStyles } from '../../../../CanvasRenderer/utils/painter/structures/TCanvasStyles';
import { TTextStyles } from './TTextStyles';

export class CTextPainter extends CanvasBasePainter {

    private styles: TTextStyles;

    constructor(theme: TThemeStyles) {
        super();
        this.applyTheme(theme);
    }

    public applyTheme(theme: TThemeStyles) {
        this.styles = {
            colorBackground: theme.colorPrimaryExtraDark,
            colorBackgroundBorder: theme.colorPrimary,
            colorFont: theme.colorPrimary,
            backgroundBorderWidth: 4,
            maxLineHeight: 30
        }
    }

    public getBorderWidth(): number {
        return this.styles.backgroundBorderWidth;
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
        const styles: Partial<TLineStyles> = {
            lineWidth: this.styles.backgroundBorderWidth,
            strokeStyle: this.styles.colorBackgroundBorder,
            shadowBlur: 4,
            shadowColor: this.styles.colorBackgroundBorder,
            shadowOffsetY: 2
        }
        const topY: number = rect.y + this.styles.backgroundBorderWidth * 0.5;
        this.strokeLines(ctx, [{ x: rect.x, y: topY }, { x: rect.x + rect.width, y: topY }], styles);

        const bottomY: number = rect.y + rect.height - this.styles.backgroundBorderWidth * 0.5;
        styles.shadowOffsetY = -2;
        this.strokeLines(ctx, [{ x: rect.x, y: bottomY }, { x: rect.x + rect.width, y: bottomY }], styles);
    }

    public drawContent(ctx: CanvasRenderingContext2D, rect: TRect, content: string[]): void {
        const marginHeight: number = 10;
        const totalMarginHeight: number = marginHeight * (content.length + 2);
        const maxLineHeight: number = Math.min(Math.max((rect.height - totalMarginHeight) / content.length, 0), this.styles.maxLineHeight);
        const equalFontHeight: number = content.reduce((prev, curr) => {
            const fittingFontHeight: number = this.getFittingFontHeight(ctx, curr, maxLineHeight, Constants.fontMain, null, rect.width);
            return Math.min(prev, fittingFontHeight);
        }, maxLineHeight);
        const styles: TFillText = {
            fillStyle: this.styles.colorFont,
            font: this.getFontStyle(Constants.fontMain, equalFontHeight),
            textAlign: 'left',
            textBaseline: 'middle'
        };
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        let currentY: number = marginHeight + equalFontHeight * 0.5;
        content.forEach((sentence) => {
            ctx.fillText(sentence, rect.x, currentY);
            currentY += marginHeight + equalFontHeight;
        });
        this.applyStyles(ctx, savedStyles);
    }
}