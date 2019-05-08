import { CursorType } from "../structures/CursorType";

export interface ILayerViewport {
    setCursor(type: CursorType): void;
}