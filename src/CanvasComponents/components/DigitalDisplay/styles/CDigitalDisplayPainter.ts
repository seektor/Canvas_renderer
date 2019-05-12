import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import ThemingService from '../../../../app/services/themingService/ThemingService';
import { Constants } from '../../../../app/utils/Constants';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TFillArcSektorStyles, TFillTextStyles } from '../../../../CanvasRenderer/utils/painter/structures/CanvasPainterTypes';
import { TDigitalDisplayStyles } from './TDigitalDisplayStyles';

export class CDigitalDisplayPainter extends CanvasBasePainter {

    private styles: TDigitalDisplayStyles;
    private externalRingWidth: number;
    private rotatorWidth: number;

    constructor() {
        super();
        this.externalRingWidth = 0;
        this.rotatorWidth = 0;
        this.applyTheme();
    }

    private applyTheme() {
        const theme: TThemeStyles = ThemingService.getTheme();
        this.styles = {
            colorBackground: theme.colorBackgroundDarker,
            colorExternalCircle: theme.colorPrimary,
            colorInternalCircle: theme.colorPrimaryDarker,
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
        const internalFillRect: TRect = { x: rect.x + ringWidth, y: rect.y + ringWidth, width: rect.width - ringWidth * 2, height: rect.height - ringWidth * 2 };
        this.fillCircle(ctx, internalFillRect, { fillStyle: this.styles.colorBackground });
    }

    public drawRotator(ctx: CanvasRenderingContext2D, rect: TRect): void {
        const styles: TFillArcSektorStyles = {
            fillStyle: this.styles.colorInternalCircle,
            strokeStyle: this.styles.colorBackground
        }
        this.fillArcSector(ctx, rect, -Math.PI * 0.8, -Math.PI * 0.2, styles);
        this.fillArcSector(ctx, rect, Math.PI * 0.2, Math.PI * 0.8, styles);
        const ringWidth: number = this.rotatorWidth;
        const internalFillRect: TRect = { x: rect.x + ringWidth, y: rect.y + ringWidth, width: Math.max(1, rect.width - ringWidth * 2), height: Math.max(1, rect.height - ringWidth * 2) };
        styles.fillStyle = this.styles.colorBackground;
        this.fillArcSector(ctx, internalFillRect, -Math.PI * 0.8, -Math.PI * 0.2, styles);
        this.fillArcSector(ctx, internalFillRect, Math.PI * 0.2, Math.PI * 0.8, styles);
        const coverRectY: number = rect.height * 0.5 - Math.sin(Math.PI * 0.2) * (rect.width * 0.5 - ringWidth);
        const coverRectX: number = rect.width * 0.5 - Math.cos(Math.PI * 0.2) * (rect.width * 0.5 - ringWidth);
        const squareCoverRect: TRect = { x: coverRectX, y: coverRectY, width: rect.width - coverRectX * 2, height: rect.height - coverRectY * 2 };
        this.fillRect(ctx, squareCoverRect, styles);
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
        const styles: TFillTextStyles = {
            fillStyle: this.styles.colorText,
            textAlign: "center",
            font: this.getFontStyle(Constants.fontMain, timeHeight * 0.5, 'bold'),
            textBaseline: "top"
        }
        this.fillText(ctx, timeString, timeCoords, styles);
        styles.font = this.getFontStyle(Constants.fontMain, dayHeight * 0.4);
        styles.textBaseline = "bottom";
        this.fillText(ctx, dayNameString, dayCoords, styles);
    }

}