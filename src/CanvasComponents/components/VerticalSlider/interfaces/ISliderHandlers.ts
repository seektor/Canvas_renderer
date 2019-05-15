export interface ISliderHandlers {
    setScrollWrapperScrollSize(size: number): void;
    setScrollWrapperDisplaySize(size: number): void;
    init(scrollWrapperScrollSize: number, scrollWrapperDisplaySize: number);
}