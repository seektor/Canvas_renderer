import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import ThemingService from '../../../../app/services/themingService/ThemingService';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TTextStyles } from './TTextStyles';

export class CTextPainter extends CanvasBasePainter {

    private styles: TTextStyles;

    constructor() {
        super();
        this.applyTheme();
    }

    private applyTheme() {
        const theme: TThemeStyles = ThemingService.getTheme();
        this.styles = {
            colorBackground: theme.colorBackgroundDark,
        }
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }
}