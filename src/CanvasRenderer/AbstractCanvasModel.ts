import { Observable, Subject } from 'rxjs';

export abstract class AbstractCanvasModel {

    public readonly onForceRender$: Observable<void>;
    protected forceRender$: Subject<void>;
    public readonly onForceRerender$: Observable<void>;
    protected forceRerender$: Subject<void>;

    constructor() {
        this.forceRender$ = new Subject();
        this.onForceRender$ = this.forceRender$.asObservable();
        this.forceRerender$ = new Subject();
        this.onForceRerender$ = this.forceRerender$.asObservable();
    }
}