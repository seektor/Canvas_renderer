import { Observable } from "rxjs";

export interface IScrollbarHandlers {
    readonly onScrollbarRatioDidChange$: Observable<number>;
    setScrollWrapperScrollSize(size: number): void;
    setScrollWrapperDisplaySize(size: number, notifyChange: boolean): void;
    setVisibility(isVisible: boolean);
}