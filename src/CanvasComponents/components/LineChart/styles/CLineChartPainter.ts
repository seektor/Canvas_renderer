import { TThemeStyles } from '../../../../app/services/themingService/structures/TThemeStyles';
import ThemingService from '../../../../app/services/themingService/ThemingService';
import { TDimensions } from '../../../../CanvasRenderer/structures/TDimensions';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TCanvasStyles } from '../../../../CanvasRenderer/utils/painter/structures/TCanvasStyles';
import { CLineChartAxesLayer } from '../layers/CLineChartAxesLayer';
import { CLineChartMainStage } from '../stages/CLineChartMainStage';
import { TLineChartStyles } from './TLineChartStyles';

export class CLineChartPainter extends CanvasBasePainter {

    private styles: TLineChartStyles;
    private readonly axisLineWidth: number = 3;
    private readonly axisLineIndicatorWidth: number = 2;
    private readonly chartLineWidth: number = 4;

    constructor() {
        super();
        this.applyTheme();
    }

    private applyTheme() {
        const theme: TThemeStyles = ThemingService.getTheme();
        this.styles = {
            colorBackground: theme.colorBackgroundDark,
            colorAxes: theme.colorPrimary
        }
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        this.fillRect(ctx, rect, { fillStyle: this.styles.colorBackground });
    }

    public getChartRect(layer: CLineChartMainStage | CLineChartAxesLayer): TRect {
        const parentLayerDimensions: TDimensions = layer.getLayerDimensions();
        const topPadding: number = Math.min(Math.round(parentLayerDimensions.height * 0.1), 10);
        const bottomPadding: number = Math.min(Math.round(parentLayerDimensions.height * 0.2), 30);
        const leftPadding: number = Math.min(bottomPadding, parentLayerDimensions.width);
        return {
            height: parentLayerDimensions.height - topPadding - bottomPadding,
            width: parentLayerDimensions.width - leftPadding,
            x: leftPadding,
            y: topPadding
        }
    }

    public drawAxes(layer: CLineChartAxesLayer): void {
        const ctx: CanvasRenderingContext2D = layer.getLayerContext();
        const chartRect: TRect = this.getChartRect(layer);
        const styles: Partial<TCanvasStyles> = {
            lineWidth: this.axisLineWidth
        }
        // vertical Axis
        // const vaX: number =
    }

}