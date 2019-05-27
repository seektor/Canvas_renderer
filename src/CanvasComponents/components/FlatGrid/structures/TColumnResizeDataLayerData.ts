import { TColumnData } from "./TColumnData";

export interface TColumnResizeDataLayerData {
    leftBuffer: HTMLCanvasElement;
    rightBuffer: HTMLCanvasElement;
    column: Readonly<TColumnData>;
}