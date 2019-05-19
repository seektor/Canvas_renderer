import { TColorRange } from "../../../../CanvasRenderer/structures/TColorRange";

export interface TGaugeParams {
    colorPercentageRanges: TColorRange[];
    min: number;
    max: number;
}