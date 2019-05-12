import { TCanvasStyles } from './TCanvasStyles';

export type TRoundRectParams = Pick<TCanvasStyles, 'fillStyle' | 'strokeStyle' | 'lineWidth'>;
export type TFillRectStyles = Pick<TCanvasStyles, 'fillStyle'>;
export type TMeasureText = Pick<TCanvasStyles, "font">;
export type TFillTextStyles = Pick<TCanvasStyles, "fillStyle" | "font" | "textAlign" | "textBaseline">;
export type TRectStyles = Pick<TCanvasStyles, 'strokeStyle' | 'lineWidth' | 'shadowBlur' | 'shadowColor' | 'shadowOffsetY'>;
export type TLineStyles = Pick<TCanvasStyles, 'strokeStyle' | 'lineWidth' | 'shadowBlur' | 'shadowColor' | 'shadowOffsetY'>;
export type TFillCircleStyles = Pick<TCanvasStyles, 'fillStyle'>;
export type TFillArcSektorStyles = Pick<TCanvasStyles, 'fillStyle' | 'strokeStyle'>;

