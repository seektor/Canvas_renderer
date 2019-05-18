import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import ThemingService from '../../../../app/services/themingService/ThemingService';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TFillArcStyles } from '../../../../CanvasRenderer/utils/painter/structures/CanvasPainterTypes';
import { TGaugeStyles } from './TGaugeStyles';

export class CGaugePainter extends CanvasBasePainter {

    private styles: TGaugeStyles;

    constructor() {
        super();
        this.applyTheme();
    }

    private applyTheme() {
        const theme: TThemeStyles = ThemingService.getTheme();
        this.styles = {
            colorBackground: theme.colorBackgroundDarker,
            colorGauge: theme.colorPrimary
        }
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }

    public drawGauge(ctx: CanvasRenderingContext2D, rect: TRect, fromAngle: number, toAngle: number): void {
        const styles: Partial<TFillArcStyles> = {
            fillStyle: this.styles.colorGauge
        }
        const centerX: number = rect.x + Math.round(rect.width * 0.5);
        const centerY: number = rect.y + Math.round(rect.height * 0.5);
        const outerRadius: number = Math.round(rect.width * 0.5);
        const innerRadius: number = Math.round(outerRadius * 0.8);
        this.fillArcRing(ctx, centerX, centerY, fromAngle, toAngle, outerRadius, innerRadius, styles);
    }
}