import { BaseCanvasPainter } from '../../../../CanvasRenderer/utils/painter/BaseCanvasPainter';
import { TVerticalSliderStyles } from './VerticalSliderStyles';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TLineStyles } from '../../../../CanvasRenderer/utils/painter/structures/CanvasPainterTypes';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';

export class VerticalSliderCanvasPainter extends BaseCanvasPainter {

    private styles: TVerticalSliderStyles;

    constructor(styles: TVerticalSliderStyles) {
        super();
        this.styles = styles;
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect, borderWidth: number): void {
        const radius: number = Math.round(rect.width * 0.5);
        this.roundRect(ctx, rect, radius, false, true, { fillStyle: this.styles.colorBackground });
        this.roundRect(ctx, {
            x: rect.x + borderWidth,
            y: rect.y + borderWidth,
            height: rect.height - borderWidth * 2,
            width: rect.width - borderWidth * 2,
        }, radius * 0.8, false, true, { fillStyle: this.styles.colorTrack });
    }

    public drawHandle(ctx: CanvasRenderingContext2D, rect: TRect): void {
        const radius: number = Math.round(rect.width * 0.5);
        const gradient = ctx.createLinearGradient(rect.x, rect.y, rect.x + rect.width, rect.y + rect.height);
        gradient.addColorStop(0, this.styles.colorInteractiveElement_1);
        gradient.addColorStop(1, this.styles.colorInteractiveElement_2);
        this.roundRect(ctx, rect, radius, false, true, { fillStyle: gradient });
    }

    public drawArrowButton(ctx: CanvasRenderingContext2D, rect: TRect, direction: Direction.Up | Direction.Down): void {
        const horizontalPadding: number = Math.round(rect.width * 0.8);
        const pointerPadding: number = Math.round(rect.height * 0.4);
        const contraryPointerPadding: number = Math.round(rect.height * 0.2);
        const styles: Partial<TLineStyles> = {
            strokeStyle: this.styles.colorInteractiveElement_2,
            lineWidth: 2
        };
        const point0: TCoords = {
            x: rect.x + horizontalPadding,
            y: direction === Direction.Up ? rect.y + rect.height - contraryPointerPadding : rect.y + contraryPointerPadding
        };
        const point1: TCoords = {
            x: Math.round(rect.x + rect.width * 0.5),
            y: direction === Direction.Up ? rect.y + pointerPadding : rect.y + rect.height - pointerPadding
        };
        const point2: TCoords = {
            x: rect.x + rect.width - horizontalPadding,
            y: direction === Direction.Up ? rect.y + rect.height - contraryPointerPadding : rect.y + contraryPointerPadding
        }
        this.drawLines(ctx, [point0, point1, point2], styles);
    }

}