import { Observable } from "rxjs";

export interface ISliderHandlers {
    readonly onSliderRatioDidChange$: Observable<number>;
    setScrollWrapperScrollSize(size: number): void;
    setScrollWrapperDisplaySize(size: number, notifyChange: boolean): void;
    setVisibility(isVisible: boolean);
}