export interface ISliderHandlers {
    setScrollWrapperScrollSize(size: number): void;
    setScrollWrapperDisplaySize(size: number): void;
    initSlider(scrollWrapperScrollSize: number, scrollWrapperDisplaySize: number);
}