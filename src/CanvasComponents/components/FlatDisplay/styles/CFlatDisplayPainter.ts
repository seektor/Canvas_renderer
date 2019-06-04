import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import { DifferenceDirection } from '../../../../app/structures/DifferenceDirection';
import { Constants } from '../../../../app/utils/Constants';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TFillText } from '../../../../CanvasRenderer/utils/painter/structures/CanvasPainterTypes';
import Colors from '../../../../UIHelpers/Colors';
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
            colorDifferenceDecrease: theme.colorDanger,
            colorDifferenceIncrease: theme.colorSuccess,
            colorDifferenceNone: theme.colorSecondary
        }
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }

    public drawValueInDifferenceMode(ctx: CanvasRenderingContext2D, rect: TRect, valueText: string, differenceText: string, differenceDirection: DifferenceDirection) {
        const valueRect: TRect = { x: rect.x, y: rect.y, height: rect.y + rect.height, width: Math.round(rect.x + rect.width * 0.6) };
        const styles: TFillText = {
            fillStyle: this.styles.colorText,
            font: '',
            textAlign: "right",
            textBaseline: "middle"
        };

        const valueFittingFont: string = this.getFittingFont(ctx, valueText, valueRect.height, Constants.fontMain, null, valueRect.width);
        styles.font = valueFittingFont;
        const valueCoords: TCoords = { x: valueRect.x + valueRect.width, y: valueRect.y + valueRect.height * 0.5 };
        this.fillText(ctx, valueText, valueCoords, styles);

        const differenceRect: TRect = { x: valueRect.width, y: valueRect.height * 0.5, height: valueRect.height * 0.5, width: rect.width - valueRect.width };
        const differenceFittingFont: string = this.getFittingFont(ctx, differenceText, differenceRect.height, Constants.fontMain, 'bold', differenceRect.width);
        styles.textAlign = "left";
        styles.fillStyle = this.getDifferenceFillStyle(differenceDirection);
        styles.font = differenceFittingFont;
        const differenceCenterCoords: TCoords = { x: differenceRect.x, y: differenceRect.y + differenceRect.height * 0.5 };
        this.fillText(ctx, differenceText, differenceCenterCoords, styles);
    }

    private getDifferenceFillStyle(differenceDirection: DifferenceDirection): string {
        switch (differenceDirection) {
            case DifferenceDirection.Increase:
                return this.styles.colorDifferenceIncrease;
            case DifferenceDirection.Decrease:
                return this.styles.colorDifferenceDecrease;
            case DifferenceDirection.None:
                return this.styles.colorDifferenceNone;
        }
    }

    public drawValueInAccomplishmentMode(ctx: CanvasRenderingContext2D, rect: TRect, valueText: string, maxValueText: string): void {
        const text: string = `${valueText}/${maxValueText}`;
        const fittingFont: string = this.getFittingFont(ctx, text, rect.height, Constants.fontMain, null, rect.width);
        const styles: TFillText = {
            fillStyle: this.styles.colorText,
            font: fittingFont,
            textAlign: "center",
            textBaseline: "middle"
        };
        const centerCoords: TCoords = { x: rect.x + rect.width * 0.5, y: rect.y + rect.height * 0.5 };
        this.fillText(ctx, text, centerCoords, styles);
    }

    public drawValueInFlatMode(ctx: CanvasRenderingContext2D, rect: TRect, valueText: string): void {
        this.fillRect(ctx, rect, { fillStyle: Colors.AMBER });
    }
}