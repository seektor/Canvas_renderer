import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import { Constants } from '../../../../app/utils/Constants';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TFillText, TStrokeArcStyles } from '../../../../CanvasRenderer/utils/painter/structures/CanvasPainterTypes';
import { TDigitalDisplayStyles } from './TDigitalDisplayStyles';

export class CDigitalDisplayPainter extends CanvasBasePainter {

    private styles: TDigitalDisplayStyles;
    private externalRingWidth: number;
    private rotatorWidth: number;

    constructor(theme: TThemeStyles) {
        super();
        this.externalRingWidth = 0;
        this.rotatorWidth = 0;
        this.applyTheme(theme);
    }

    public applyTheme(theme: TThemeStyles) {
        this.styles = {
            colorBackground: theme.colorBackgroundDark,
            colorExternalCircle: theme.colorPrimary,
            colorInternalCircle: theme.colorPrimaryDark,
            colorText: theme.colorPrimary
        }
    }

    public setRenderProperties(externalRingWidth: number, rotatorWidth: number): void {
        this.externalRingWidth = externalRingWidth;
        this.rotatorWidth = rotatorWidth;
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }

    public drawExternalCircle(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillCircle(ctx, rect, { fillStyle: this.styles.colorExternalCircle });
        const ringWidth: number = this.externalRingWidth;
        const internalFillRect: TRect = { x: rect.x + ringWidth, y: rect.y + ringWidth, width: Math.max(0, rect.width - ringWidth * 2), height: Math.max(0, rect.height - ringWidth * 2) };
        this.fillCircle(ctx, internalFillRect, { fillStyle: this.styles.colorBackground });
    }

    public drawRotator(ctx: CanvasRenderingContext2D, rect: TRect): void {
        const styles: TStrokeArcStyles = {
            strokeStyle: this.styles.colorInternalCircle,
            lineWidth: 5,
        }
        const centerX: number = rect.width * 0.5;
        const centerY: number = rect.height * 0.5;
        const fromTopBaseAngle: number = -Math.PI * 0.8;
        const toTopBaseAngle: number = -Math.PI * 0.2;
        const radius: number = Math.max(rect.width * 0.5 - this.rotatorWidth * 1.5, 1);
        this.strokeArcRing(ctx, centerX, centerY, toTopBaseAngle, fromTopBaseAngle, radius, true, styles);
        const fromBottomBaseAngle: number = Math.PI * 0.2;
        const toBottomBaseAngle: number = Math.PI * 0.8;
        this.strokeArcRing(ctx, centerX, centerY, fromBottomBaseAngle, toBottomBaseAngle, radius, false, styles);
    }

    public renderDisplay(ctx: CanvasRenderingContext2D, rect: TRect) {
        const date: Date = new Date();
        const dayNameString: string = date.toLocaleDateString(undefined, { weekday: 'long' });
        const splitDate: string[] = date.toTimeString().split(':');
        const hh: string = splitDate[0];
        const mm: string = splitDate[1];
        const timeString: string = `${hh}:${mm}`;
        const timeHeight: number = rect.height * 0.6;
        const dayHeight: number = rect.height * 0.4;
        const timeCoords: TCoords = { x: rect.width * 0.5, y: timeHeight * 0.5 };
        const dayCoords: TCoords = { x: rect.width * 0.5, y: timeHeight + dayHeight * 0.5 };
        const styles: TFillText = {
            fillStyle: this.styles.colorText,
            textAlign: "center",
            font: this.getFontStyle(Constants.fontMain, timeHeight * 0.5, 'bold'),
            textBaseline: "top"
        }
        this.fillText(ctx, timeString, timeCoords, styles);
        styles.font = this.getFontStyle(Constants.fontMain, Math.round(dayHeight * 0.4));
        styles.textBaseline = "bottom";
        this.fillText(ctx, dayNameString, dayCoords, styles);
    }

}