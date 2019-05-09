import { CanvasBasePainter } from '../../../../CanvasRenderer/utils/painter/CanvasBasePainter';
import { TVerticalSliderStyles } from './VerticalSliderStyles';
import { TRect } from '../../../../CanvasRenderer/structures/TRect';
import { Direction } from '../../../../CanvasRenderer/structures/Direction';
import { TLineStyles } from '../../../../CanvasRenderer/utils/painter/structures/CanvasPainterTypes';
import { TCoords } from '../../../../CanvasRenderer/structures/TCoords';

export class CVerticalSliderPainter extends CanvasBasePainter {

    private styles: TVerticalSliderStyles;

    constructor(styles: TVerticalSliderStyles) {
        super();
        this.styles = styles;
    }

    public getSliderBorderWidth(displayWidth: number): number {
        return Math.round(displayWidth * 0.2);
    }

    public drawBackground(ctx: CanvasRenderingContext2D, rect: TRect): void {
        const radius: number = Math.round(rect.width * 0.5);
        const borderWidth: number = this.getSliderBorderWidth(rect.width);
        this.roundRect(ctx, rect, radius, false, true, { fillStyle: this.styles.colorBackground });
        this.roundRect(ctx, {
            x: rect.x + borderWidth,
            y: rect.y + borderWidth,
            height: rect.height - borderWidth * 2,
            width: rect.width - borderWidth * 2,
        }, radius * 0.6, false, true, { fillStyle: this.styles.colorTrack });
    }

    public drawHandle(ctx: CanvasRenderingContext2D, rect: TRect): void {
        const radius: number = Math.round(rect.width * 0.5);
        const gradient = ctx.createLinearGradient(rect.x, rect.y, rect.x + rect.width, rect.y + rect.height);
        gradient.addColorStop(0, this.styles.colorInteractiveElement_1);
        gradient.addColorStop(1, this.styles.colorInteractiveElement_2);
        this.roundRect(ctx, rect, radius, false, true, { fillStyle: gradient });
    }

    public drawArrowButton(ctx: CanvasRenderingContext2D, rect: TRect, direction: Direction.Up | Direction.Down, active?: boolean): void {
        const horizontalPadding: number = this.getSliderBorderWidth(rect.width);
        const pointerPadding: number = Math.round(rect.height * 0.4);
        const contraryPointerPadding: number = Math.round(rect.height * 0.25);
        const styles: Partial<TLineStyles> = {
            strokeStyle: active ? this.styles.colorInteractiveElement_1 : this.styles.colorInteractiveElement_2,
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