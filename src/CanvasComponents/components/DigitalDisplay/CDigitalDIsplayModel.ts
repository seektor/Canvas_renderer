import { Observable, Subject } from 'rxjs';
import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';

export class CDigitalDisplayModel extends AbstractCanvasModel {

    public rotatorDidRotate$: Subject<void>;
    private onRotatorDidRotate$: Observable<void>;

    constructor() {
        super();
        this.rotatorDidRotate$ = new Subject();
        this.onRotatorDidRotate$ = this.rotatorDidRotate$.asObservable();
        this.onRotatorDidRotate$.subscribe(() => this.forceRender$.next());
    }
}