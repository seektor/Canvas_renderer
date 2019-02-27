import { fromEvent, Observable, Subject } from "rxjs";
import { TCoordinates } from "../structures/TCoordinates";

export abstract class AbstractCanvasViewport {

    constructor() {

    }

    private createMainEvents() {
        // const mouseDown$: Observable<TCoordinates> = fromEvent(this.displayCanvas, `mousedown`)
        //     .pipe(map(this.mouseEventToCoordinate));
        // const mouseUp$: Observable<TCoords> = fromEvent(this.displayCanvas, `mouseup`)
        //     .pipe(map(this.mouseEventToCoordinate));
        // const touchDown$: Observable<TCoords> = fromEvent(this.displayCanvas, `touchstart`)
        //     .pipe(map(this.touchEventToCoordinate));
        // const mouseMove$: Observable<TCoords> = fromEvent(this.displayCanvas, `mousemove`)
        //     .pipe(map(this.mouseEventToCoordinate));
        // const touchUp$: Observable<TCoords> = fromEvent(this.displayCanvas, `touchup`)
        //     .pipe(map(this.touchEventToCoordinate));
        // const touchMove$: Observable<TCoords> = fromEvent(this.displayCanvas, `touchmove`)
        //     .pipe(map(this.touchEventToCoordinate));
        // const mouseOut$: Observable<Event> = fromEvent(this.displayCanvas, `mouseout`);
        // const touchOut$: Observable<Event> = fromEvent(this.displayCanvas, `touchend`);

        // this.actionStart$ = merge(mouseDown$, touchDown$);
        // this.actionDoubleStart$ = this.actionStart$
        //     .pipe((buffer(this.actionStart$
        //         .pipe(debounceTime(250)))), filter(((coordsArray) => coordsArray.length === 2)), map((coordsArray: TCoords[]) => coordsArray[1]));
        // this.actionMove$ = merge(mouseMove$, touchMove$);
        // this.actionDrag$ = this.actionStart$
        //     .pipe(map((startCoords) => {
        //         const plane: IPlane = this.getPlanesFromCoordinates(startCoords).filter((filteredPlane) => filteredPlane.acceptAction(ActionType.ActionDrag, startCoords))[0];
        //         return [plane, startCoords];
        //     }), filter((planeAndStartCoords: TTuple<IPlane[], TCoords>) => {
        //         return !Utils.isNullOrUndefined(planeAndStartCoords[0]);
        //     }), switchMap((planeAndCoords: TTuple<IPlane, TCoords>) => {
        //         return this.actionMove$
        //             .pipe(map((moveCoords): TTuple<IPlane, TCoords> => [planeAndCoords[0], moveCoords]), takeUntil(this.actionEndOrOut$), finalize(() => this.onHandleDragEnd(planeAndCoords[0])));
        //     }));
        // this.actionEnd$ = merge(mouseUp$, touchUp$);
        // this.actionOut$ = merge(mouseOut$, touchOut$);
        // this.actionEndOrOut$ = merge(this.actionEnd$, this.actionOut$);
        // this.actionWheel$ = fromEvent(this.displayCanvas, "wheel").pipe(tap((event: WheelEvent) => {
        //     event.preventDefault();
        // }));

        // this.model.recalculatePosition$.subscribe(() => this.onActionMove(this.model.currentActionCoordinates));
        // this.model.renderView$.subscribe(() => this.renderView());
        // this.model.cursorType$.subscribe((cursorType) => this.setCursorType(cursorType));
        // this.actionOut$.subscribe(() => this.setActivePlane(this.planes[0]));
    }
}