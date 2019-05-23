import { Observable, Subject } from 'rxjs';
import { CanvasBasePainter } from './utils/painter/CanvasBasePainter';

export abstract class AbstractCanvasModel {

    public readonly onForceRender$: Observable<void>;
    protected forceRender$: Subject<void>;
    public readonly onForceRerender$: Observable<void>;
    protected forceRerender$: Subject<void>;

    constructor() {
        this.forceRender$ = new Subject();
        this.onForceRender$ = this.forceRender$.asObservable();
        this.forceRerender$ = new Subject();
        this.onForceRerender$ = this.forceRender$.asObservable();
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