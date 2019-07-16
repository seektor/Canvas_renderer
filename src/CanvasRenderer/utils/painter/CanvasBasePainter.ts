import { TCoords } from '../../structures/TCoords';
import { TRect } from '../../structures/TRect';
import { FontDecoration, TFillArcStyles, TFillCircleStyles, TFillRectStyles, TFillText, TLineStyles, TMeasureText, TRectStyles as TStrokeRectStyles, TRoundRectParams, TStrokeArcStyles } from './structures/CanvasPainterTypes';
import { TCanvasStyles } from './structures/TCanvasStyles';

export class CanvasBasePainter {

    protected strokeLines(ctx: CanvasRenderingContext2D, points: TCoords[], styles: Partial<TLineStyles>): void {
        if (points.length === 0) {
            return;
        }
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach((point) => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
        this.applyStyles(ctx, savedStyles);
    }

    protected strokeLinesPure(ctx: CanvasRenderingContext2D, points: TCoords[]): void {
        if (points.length === 0) {
            return;
        }
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach((point) => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.stroke();
    }

    protected roundRect(ctx: CanvasRenderingContext2D, rect: TRect, radius: number, stroke: boolean, fill: boolean, styles: Partial<TRoundRectParams>): void {
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        const { x, y, width, height } = rect;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
        this.applyStyles(ctx, savedStyles);
    }

    protected fillRect(ctx: CanvasRenderingContext2D, rect: TRect, styles: Partial<TFillRectStyles>): void {
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        this.applyStyles(ctx, savedStyles);
    }

    protected strokeRect(ctx: CanvasRenderingContext2D, rect: TRect, styles: Partial<TStrokeRectStyles>): void {
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        this.applyStyles(ctx, savedStyles);
    }

    protected fillCircle(ctx: CanvasRenderingContext2D, rect: TRect, styles: Partial<TFillCircleStyles>): void {
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        const centerX: number = Math.floor(rect.x + rect.width * 0.5);
        const centerY: number = Math.floor(rect.y + rect.height * 0.5);
        const radius: number = Math.floor(rect.width * 0.5);
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
        ctx.fill();
        this.applyStyles(ctx, savedStyles);
    }

    protected fillArcSector(ctx: CanvasRenderingContext2D, rect: TRect, fromAngle: number, toAngle: number, anticlockwise: boolean, styles: Partial<TFillArcStyles>): void {
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        const centerX: number = Math.floor(rect.x + rect.width * 0.5);
        const centerY: number = Math.floor(rect.y + rect.height * 0.5);
        const radius: number = Math.floor(rect.width * 0.5);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, fromAngle, toAngle, anticlockwise);
        ctx.lineTo(centerX, centerY);
        ctx.closePath();
        ctx.fill();
        this.applyStyles(ctx, savedStyles);
    }

    protected strokeArcRing(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, startAngle: number, endAngle: number, outerRadius: number, anticlockwise: boolean, styles: TStrokeArcStyles): void {
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        const strokeRadius: number = Math.max(outerRadius - styles.lineWidth * 0.5, 0);
        ctx.beginPath();
        ctx.arc(centerX, centerY, strokeRadius, startAngle, endAngle, anticlockwise);
        ctx.stroke();
        ctx.closePath();
        this.applyStyles(ctx, savedStyles);
    }

    protected fillText(ctx: CanvasRenderingContext2D, text: string, coords: TCoords, styles: Partial<TFillText>) {
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        ctx.fillText(text, coords.x, coords.y);
        this.applyStyles(ctx, savedStyles);
    }

    protected getFontStyle(fontName: string, fontHeight: number, decoration?: FontDecoration): string {
        return decoration ? `${decoration} ${fontHeight}px ${fontName}` : `${fontHeight}px ${fontName}`
    }

    protected measureTextWidth(ctx: CanvasRenderingContext2D, text: string, styles: TMeasureText): number {
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        const textWidth: number = ctx.measureText(text).width;
        this.applyStyles(ctx, savedStyles);
        return textWidth;
    }

    protected truncateText(ctx: CanvasRenderingContext2D, text: string, font: string, maxWidth: number, truncationSymbol: string): string {
        const initialFontStyle: string = ctx.font;
        ctx.font = font;
        const truncationSymbolWidth: number = ctx.measureText(truncationSymbol).width;
        if (truncationSymbolWidth > maxWidth) {
            return ``;
        }
        let textWidth: number = ctx.measureText(text).width;
        if (textWidth > maxWidth) {
            const maxTruncatedTextLength: number = maxWidth - truncationSymbolWidth;
            while (textWidth >= maxTruncatedTextLength) {
                text = text.slice(0, -1);
                textWidth = ctx.measureText(text).width;
            }
            return text.concat(truncationSymbol);
        }
        ctx.font = initialFontStyle;
        return text;
    }

    protected getFittingFont(ctx: CanvasRenderingContext2D, text: string, height: number, fontName: string, decoration: FontDecoration | null, maxWidth: number): string {
        const fittingFontHeight: number = this.getFittingFontHeight(ctx, text, height, fontName, decoration, maxWidth);
        return this.getFontStyle(fontName, fittingFontHeight, decoration);
    }

    protected getFittingFontHeight(ctx: CanvasRenderingContext2D, text: string, height: number, fontName: string, decoration: FontDecoration | null, maxWidth: number): number {
        const initialFontStyle: string = ctx.font;
        let fontHeight: number = height;
        let font: string = this.getFontStyle(fontName, fontHeight, decoration);
        ctx.font = font;
        let textWidth: number = ctx.measureText(text).width;
        while (textWidth > maxWidth) {
            fontHeight -= 1;
            font = this.getFontStyle(fontName, fontHeight, decoration);
            ctx.font = font;
            textWidth = ctx.measureText(text).width;
        }
        ctx.font = initialFontStyle;
        return fontHeight;
    }

    protected truncateTextPure(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, truncationSymbol: string, truncationSymbolWidth: number): string {
        if (truncationSymbolWidth > maxWidth) {
            return ``;
        }
        let textWidth: number = ctx.measureText(text).width;
        if (textWidth > maxWidth) {
            const maxTruncatedTextLength: number = maxWidth - truncationSymbolWidth;
            while (textWidth >= maxTruncatedTextLength) {
                text = text.slice(0, -1);
                textWidth = ctx.measureText(text).width;
            }
            return text.concat(truncationSymbol);
        }
        return text;
    }

    protected applyStyles(ctx: CanvasRenderingContext2D, styles: Partial<TCanvasStyles>): void {
        (Object.keys(styles) as Array<keyof typeof styles>).forEach((key) => {
            (ctx as object)[key] = styles[key]!;
        });
    }

    protected extractStyles(ctx: CanvasRenderingContext2D, keys: Array<(keyof TCanvasStyles)>): Partial<TCanvasStyles> {
        const extract: Partial<TCanvasStyles> = {};
        keys.forEach((key) => (extract as object)[key] = ctx[key]);
        return extract;
    }

}