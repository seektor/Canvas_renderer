import { Observable } from "rxjs";

export interface IScrollbarHandlers {
    readonly onScrollbarRatioDidChange$: Observable<number>;
    setScrollWrapperScrollSize(size: number): void;
    setScrollWrapperDisplaySize(size: number): void;
    setVisibility(isVisible: boolean);
}