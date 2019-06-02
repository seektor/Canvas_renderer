import { Direction } from '../../../../CanvasRenderer/structures/Direction';

export interface TScrollbarButtonParams<T extends Direction> {
    direction: T;
    callback: () => void;
}