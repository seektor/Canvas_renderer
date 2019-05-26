import { Observable } from "rxjs";

export interface ISliderHandlers {
    readonly onSelectedRatioDidChange$: Observable<number>;
    setScrollWrapperScrollSize(size: number): void;
    setScrollWrapperDisplaySize(size: number): void;
}