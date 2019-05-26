import { Direction } from '../../../../CanvasRenderer/structures/Direction';

export interface TVerticalSliderButtonParams {
    direction: Direction.Up | Direction.Down;
    callback: () => void;
}