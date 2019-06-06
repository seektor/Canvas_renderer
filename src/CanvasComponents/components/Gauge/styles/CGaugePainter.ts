import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import { Constants } from '../../../../app/utils/Constants';
import { TColorRange } from '../../../../CanvasRenderer/structures/TColorRange';
import { TRange } from '../../../../CanvasRenderer/structures/TRange';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TFillText, TStrokeArcStyles } from '../../../../CanvasRenderer/utils/painter/structures/CanvasPainterTypes';
import { TGaugeDimensions } from '../structures/TGaugeDimensions';
import { TGaugeStyles } from './TGaugeStyles';

export class CGaugePainter extends CanvasBasePainter {

    private styles: TGaugeStyles;
    private gaugeAngleRange: TRange;
    private gaugeAngleColorRanges: TColorRange[];
    private gaugeDimensions: TGaugeDimensions;

    constructor(theme: TThemeStyles, gaugeAngleRange: TRange, gaugeAngleColorRanges: TColorRange[]) {
        super();
        this.gaugeAngleRange = gaugeAngleRange;
        this.gaugeAngleColorRanges = gaugeAngleColorRanges;
        this.applyTheme(theme);
    }

    public applyTheme(theme: TThemeStyles) {
        this.styles = {
            colorBackground: theme.colorBackgroundDark,
            colorPassiveGauge: theme.colorPrimaryDark,
            colorActiveGauge: theme.colorPrimary
        }
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }

    public setGaugeDimensions(width: number): void {
        const outerRadius: number = width * 0.5;
        const ringWidth: number = Math.round(width * 0.2);
        const innerRadius: number = Math.max(0, outerRadius - ringWidth);
        const colorRangeWidth: number = Math.min(Math.round(ringWidth * 0.1), 12);
        const spaceWidth: number = 4;
        const activeGaugeWidth: number = Math.max(0, ringWidth - colorRangeWidth - spaceWidth);
        this.gaugeDimensions = { outerRadius, ringWidth, innerRadius, colorRangeWidth, spaceWidth, activeGaugeWidth };
    }

    public getGaugeDimensions(): TGaugeDimensions {
        return this.gaugeDimensions;
    }

    public getGaugeAngleRange(): TRange {
        return this.gaugeAngleRange;
    }

    public drawGauge(ctx: CanvasRenderingContext2D, rect: TRect, minText: string, maxText: string): void {
        const centerX: number = rect.x + Math.round(rect.width * 0.5);
        const centerY: number = rect.y + Math.round(rect.height * 0.5);
        const gD: TGaugeDimensions = this.gaugeDimensions;
        const styles: TStrokeArcStyles = {
            strokeStyle: this.styles.colorPassiveGauge,
            lineWidth: gD.colorRangeWidth
        }
        // colorRing
        styles.lineWidth = gD.colorRangeWidth;
        const colorSeparatorDiff: number = Math.PI / 180;
        this.gaugeAngleColorRanges.forEach((range: TColorRange, index: number) => {
            styles.strokeStyle = range.color;
            const from: number = index > 0 ? range.from + colorSeparatorDiff : range.from;
            const to: number = index < this.gaugeAngleColorRanges.length ? Math.max(range.to - colorSeparatorDiff, 0) : range.to;
            this.strokeArcRing(ctx, centerX, centerY, from, to, gD.outerRadius, false, styles);
        });

        const fromBaseAngle = this.gaugeAngleRange.from;
        const toBaseAngle = this.gaugeAngleRange.to;
        styles.strokeStyle = this.styles.colorBackground;
        styles.lineWidth = gD.spaceWidth;
        // colorSpace
        this.strokeArcRing(ctx, centerX, centerY, fromBaseAngle, toBaseAngle, Math.max(gD.outerRadius - gD.colorRangeWidth, 0), false, styles);
        styles.strokeStyle = this.styles.colorPassiveGauge;
        styles.lineWidth = gD.activeGaugeWidth;
        // passiveRing
        this.strokeArcRing(ctx, centerX, centerY, fromBaseAngle, toBaseAngle, Math.max(gD.outerRadius - gD.colorRangeWidth - gD.spaceWidth, 0), false, styles);

        const minMaxTextRectWidth: number = Math.max(0, Math.round(gD.outerRadius - gD.innerRadius * Math.cos(Math.PI - fromBaseAngle)));
        const minMaxTextRectHeight: number = Math.max(0, Math.round(gD.outerRadius - gD.outerRadius * Math.sin(Math.PI - fromBaseAngle)));

        const fromFittingFontHeight: number = this.getFittingFontHeight(ctx, minText, minMaxTextRectHeight, Constants.fontMain, null, minMaxTextRectWidth);
        const toFittingFontHeight: number = this.getFittingFontHeight(ctx, maxText, minMaxTextRectHeight, Constants.fontMain, null, minMaxTextRectWidth);
        const smallerFontHeight: number = Math.min(fromFittingFontHeight, toFittingFontHeight);
        const textStyles: TFillText = {
            fillStyle: this.styles.colorActiveGauge,
            font: this.getFontStyle(Constants.fontMain, smallerFontHeight, null),
            textAlign: 'center',
            textBaseline: 'middle'
        }
        this.fillText(ctx, minText, { x: rect.x + minMaxTextRectWidth * 0.5, y: rect.y + rect.height - minMaxTextRectHeight * 0.5 }, textStyles);
        this.fillText(ctx, maxText, { x: rect.x + rect.width - minMaxTextRectWidth * 0.5, y: rect.y + rect.height - minMaxTextRectHeight * 0.5 }, textStyles);
    }

    public drawValue(ctx: CanvasRenderingContext2D, rect: TRect, displayValue: string, angle: number): void {
        const centerX: number = rect.x + Math.round(rect.width * 0.5);
        const centerY: number = rect.y + Math.round(rect.height * 0.5);
        const gD: TGaugeDimensions = this.gaugeDimensions;
        const maxTextWidth: number = gD.innerRadius * 2 * Math.cos(Math.PI / 4);
        const maxTextHeight: number = gD.innerRadius * 2 * Math.sin(Math.PI / 4);
        this.fillText(ctx, displayValue, { x: centerX, y: centerY }, {
            font: this.getFittingFont(ctx, displayValue, maxTextHeight, Constants.fontMain, null, maxTextWidth),
            fillStyle: this.getColorFromRange(angle),
            textAlign: 'center',
            textBaseline: 'middle'
        });
        this.strokeArcRing(ctx, centerX, centerY, this.gaugeAngleRange.from, angle, Math.max(gD.outerRadius - gD.colorRangeWidth - gD.spaceWidth, 0), false, { lineWidth: gD.activeGaugeWidth, strokeStyle: this.styles.colorActiveGauge });
    }

    private getColorFromRange(angleValue: number): string {
        const color: string = this.styles.colorActiveGauge;
        const colorRange: TColorRange | undefined = this.gaugeAngleColorRanges.find((range) => angleValue >= range.from && angleValue <= range.to);
        return colorRange ? colorRange.color : color;
    }
}