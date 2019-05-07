import { TRect } from '../../structures/TRect';
import { TCanvasStyles } from './structures/TCanvasStyles';
import { TFillRectStyles, TRoundRectParams, TLineStyles } from './structures/CanvasPainterTypes';
import { TCoords } from '../../structures/TCoords';

export class CanvasBasePainter {

    public drawLines(ctx: CanvasRenderingContext2D, points: TCoords[], styles: Partial<TLineStyles>): void {
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

    public roundRect(ctx: CanvasRenderingContext2D, rect: TRect, radius: number, stroke: boolean, fill: boolean, styles: Partial<TRoundRectParams>): void {
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

    public fillRect(ctx: CanvasRenderingContext2D, rect: TRect, styles: Partial<TFillRectStyles>): void {
        const savedStyles: Partial<TCanvasStyles> = this.extractStyles(ctx, Object.keys(styles) as Array<(keyof TCanvasStyles)>);
        this.applyStyles(ctx, styles);
        ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
        this.applyStyles(ctx, savedStyles);
    }

    protected applyStyles(ctx: CanvasRenderingContext2D, styles: Partial<TCanvasStyles>): void {
        (Object.keys(styles) as Array<keyof typeof styles>).forEach((key) => {
            ctx[key] = styles[key]!;
        });
    }

    protected extractStyles(ctx: CanvasRenderingContext2D, keys: Array<(keyof TCanvasStyles)>): Partial<TCanvasStyles> {
        const extract: Partial<TCanvasStyles> = {};
        keys.forEach((key) => extract[key] = ctx[key]);
        return extract;
    }

}