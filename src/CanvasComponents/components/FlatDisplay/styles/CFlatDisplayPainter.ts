import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import { Constants } from '../../../../app/utils/Constants';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TFillText } from '../../../../CanvasRenderer/utils/painter/structures/CanvasPainterTypes';
import { TFlatDisplayStyles } from './TFlatDisplayStyles';

export class CFlatDisplayPainter extends CanvasBasePainter {

    private styles: TFlatDisplayStyles;

    constructor(theme: TThemeStyles) {
        super();
        this.applyTheme(theme);
    }

    public applyTheme(theme: TThemeStyles) {
        this.styles = {
            colorBackground: theme.colorBackgroundDark,
            colorText: theme.colorPrimary,
            colorChevron: theme.colorPrimaryDark,
            colorChevronActive: theme.colorPrimary
        }
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }

    public drawContent(ctx: CanvasRenderingContext2D, rect: TRect, text: string): void {
        const font: string = this.getFontStyle(Constants.fontMain, rect.height * 0.7, 'bold');
        const fittingFont: string = this.getFittingFont(ctx, text, rect.height, Constants.fontMain, 'bold', rect.width);
        const styles: TFillText = {
            fillStyle: this.styles.colorText,
            textAlign: "center",
            font: fittingFont,
            textBaseline: "middle"
        }
        const centerCoords: TCoords = { x: rect.x + rect.width * 0.5, y: rect.y + rect.height * 0.5 };
        this.fillText(ctx, text, centerCoords, styles);
    }
}