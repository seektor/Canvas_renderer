import { Observable, Subject } from 'rxjs';
import { CanvasBasePainter } from './utils/painter/CanvasBasePainter';

export abstract class AbstractCanvasModel {

    public readonly onForceRerender$: Observable<void>;
    protected forceRerender$: Subject<void>;

    constructor() {
        this.forceRerender$ = new Subject();
        this.onForceRerender$ = this.forceRerender$.asObservable();
    }

    protected canvasPainter: CanvasBasePainter;

    public onResize(): void { };

    public getCanvasPainter(): CanvasBasePainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CanvasBasePainter();
        }
        return this.canvasPainter;
    }

}