import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import ThemingService from '../../../../app/services/themingService/ThemingService';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TLineStyles } from '../../../../CanvasRenderer/utils/painter/structures/CanvasPainterTypes';
import { TLineChartStyles } from './TLineChartStyles';

export class CLineChartPainter extends CanvasBasePainter {

    private styles: TLineChartStyles;

    constructor() {
        super();
        this.applyTheme();
    }

    private applyTheme() {
        const theme: TThemeStyles = ThemingService.getTheme();
        this.styles = {
            colorBackground: theme.colorBackgroundDark,
            colorAxis: theme.colorPrimary,
            colorDataLine: theme.colorPrimary,
            colorGradientHigh: theme.colorPrimaryDark,
            colorGradientLow: theme.colorBackgroundDark,
            widthDataLine: 16,
            widthAxisLine: 6
        }
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }

    public drawDataLine(ctx: CanvasRenderingContext2D, rect: TRect, pointsRatio: number[]): void {
        if (pointsRatio.length === 0) {
            return;
        }
        const interval: number = rect.width / Math.max(pointsRatio.length - 1, 0);
        const maxHeight: number = rect.height;
        const lineStyles: Partial<TLineStyles> = {
            lineWidth: this.styles.widthDataLine,
            strokeStyle: this.styles.colorDataLine,
            lineCap: 'round',
            shadowBlur: this.styles.widthDataLine,
            shadowColor: this.styles.colorDataLine
        }
        const points: TCoords[] = pointsRatio.map((pointRatio, index) => ({ x: index * interval, y: maxHeight - pointRatio * maxHeight }));
        this.strokeLines(ctx, points, lineStyles);

        points.push({ x: points[points.length - 1].x, y: rect.height });
        const gradient = ctx.createLinearGradient(0, rect.height, 0, 0);
        gradient.addColorStop(0, this.styles.colorGradientLow);
        gradient.addColorStop(1, this.styles.colorGradientHigh);
        const initialFillStyle: string = ctx.fillStyle as string;
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        points.forEach((point) => {
            ctx.lineTo(point.x, point.y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = initialFillStyle;

    }

    public drawAxes(ctx: CanvasRenderingContext2D, rect: TRect, dataLayerRect: TRect): void {
        const styles: Partial<TLineStyles> = {
            lineWidth: this.styles.widthAxisLine,
            strokeStyle: this.styles.colorAxis,
        };
        this.strokeLines(ctx,
            [{ x: dataLayerRect.x, y: dataLayerRect.y, },
            { x: dataLayerRect.x, y: dataLayerRect.y + dataLayerRect.height },
            { x: dataLayerRect.x + dataLayerRect.width, y: dataLayerRect.y + dataLayerRect.height }],
            styles);
    }

}