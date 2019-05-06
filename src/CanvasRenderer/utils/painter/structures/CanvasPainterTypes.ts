import { TCanvasStyles } from './TCanvasStyles';

export type TRoundRectParams = Pick<TCanvasStyles, 'fillStyle' | 'strokeStyle' | 'lineWidth'>;
export type TFillRectStyles = Pick<TCanvasStyles, 'fillStyle'>;
export type TLineStyles = Pick<TCanvasStyles, 'strokeStyle' | 'lineWidth' | 'shadowBlur' | 'shadowColor' | 'shadowOffsetX'>;

