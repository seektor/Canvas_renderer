import { TCanvasStyles } from './TCanvasStyles';

export type TRoundRectParams = Pick<TCanvasStyles, 'fillStyle' | 'strokeStyle' | 'lineWidth'>;
export type TFillRectStyles = Pick<TCanvasStyles, 'fillStyle'>;

