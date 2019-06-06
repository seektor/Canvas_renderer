import { TCanvasStyles } from './TCanvasStyles';

export type TRoundRectParams = Pick<TCanvasStyles, 'fillStyle' | 'strokeStyle' | 'lineWidth'>;
export type TFillRectStyles = Pick<TCanvasStyles, 'fillStyle'>;
export type TMeasureText = Pick<TCanvasStyles, "font">;
export type TFillText = Pick<TCanvasStyles, "fillStyle" | "font" | "textAlign" | "textBaseline">;
export type TRectStyles = Pick<TCanvasStyles, 'strokeStyle' | 'lineWidth' | 'shadowBlur' | 'shadowColor' | 'shadowOffsetY'>;
export type TLineStyles = Pick<TCanvasStyles, 'strokeStyle' | 'lineWidth' | 'lineCap' | 'shadowBlur' | 'shadowColor' | 'shadowOffsetY'>;
export type TFillCircleStyles = Pick<TCanvasStyles, 'fillStyle'>;
export type TFillArcStyles = Pick<TCanvasStyles, 'fillStyle' | 'strokeStyle'>;
export type TStrokeArcStyles = Pick<TCanvasStyles, 'strokeStyle' | 'lineWidth'>;

export type FontDecoration = 'bold' | 'italic';

