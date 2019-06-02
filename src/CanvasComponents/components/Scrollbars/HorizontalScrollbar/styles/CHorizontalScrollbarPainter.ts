import { TThemeStyles } from '../../../../../app/services/themingService/structures/TThemeStyles';
import { Direction } from '../../../../../CanvasRenderer/structures/Direction';
import { TCoords } from '../../../../../CanvasRenderer/structures/TCoords';
import { TRect } from '../../../../../CanvasRenderer/structures/TRect';
import { CanvasBasePainter } from '../../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TLineStyles } from '../../../../../CanvasRenderer/utils/painter/structures/CanvasPainterTypes';
import { THorizontalScrollbarStyles } from './THorizontalScrollbarStyles';

export class CHorizontalScrollbarPainter extends CanvasBasePainter {

    private styles: THorizontalScrollbarStyles;
    private readonly scrollbarBorderWidth: number = 4;

    constructor(theme: TThemeStyles) {
        super();
        this.applyTheme(theme);
    }

    public applyTheme(theme: TThemeStyles) {
        this.styles = {
            colorBackground: theme.colorBackground,
            colorTrack: theme.colorBackgroundLight,
            colorInteractiveElement: theme.colorPrimary,
            colorInteractiveElementToGradient: theme.colorPrimaryDark,
            colorInteractiveElementHovered: theme.colorSecondary
        }
    }

    public getScrollbarBorderWidth(): number {
        return this.scrollbarBorderWidth;
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        const radius: number = Math.round(rect.height * 0.5);
        const borderWidth: number = this.scrollbarBorderWidth;
        this.roundRect(ctx, rect, radius, false, true, { fillStyle: this.styles.colorBackground });
        this.roundRect(ctx, {
            x: rect.x + borderWidth,
            y: rect.y + borderWidth,
            height: rect.height - borderWidth * 2,
            width: rect.width - borderWidth * 2,
        }, radius * 0.6, false, true, { fillStyle: this.styles.colorTrack });
    }

    public drawHandle(ctx: CanvasRenderingContext2D, rect: TRect): void {
        const radius: number = Math.round(rect.height * 0.5);
        const gradient = ctx.createLinearGradient(rect.x, rect.y, rect.x + rect.width, rect.y + rect.height);
        gradient.addColorStop(0, this.styles.colorInteractiveElement);
        gradient.addColorStop(1, this.styles.colorInteractiveElementToGradient);
        this.roundRect(ctx, rect, radius, false, true, { fillStyle: gradient });
    }

    public drawArrowButton(ctx: CanvasRenderingContext2D, rect: TRect, direction: Direction.Left | Direction.Right, active?: boolean): void {
        const verticalPadding: number = this.scrollbarBorderWidth;
        const pointerPadding: number = Math.round(rect.width * 0.4);
        const contraryPointerPadding: number = Math.round(rect.width * 0.25);
        const styles: Partial<TLineStyles> = {
            strokeStyle: active ? this.styles.colorInteractiveElementHovered : this.styles.colorInteractiveElement,
            lineWidth: 2
        };
        const point0: TCoords = {
            x: direction === Direction.Left ? rect.width - contraryPointerPadding : contraryPointerPadding,
            y: verticalPadding
        };
        const point1: TCoords = {
            x: direction === Direction.Left ? pointerPadding : rect.width - pointerPadding,
            y: rect.height * 0.5
        };
        const point2: TCoords = {
            x: direction === Direction.Left ? rect.width - contraryPointerPadding : contraryPointerPadding,
            y: rect.height - verticalPadding
        }
        this.strokeLines(ctx, [point0, point1, point2], styles);
    }

}