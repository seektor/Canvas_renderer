import { AbstractCanvas } from "../../CanvasRenderer/AbstractCanvas";
import { CVerticalSliderModel } from "./CVerticalSliderModel";
import { CVerticalSliderViewport } from "./CVerticalSliderViewport";

export class CVerticalSlider extends AbstractCanvas {

    protected model: CVerticalSliderModel;
    protected viewport: CVerticalSliderViewport;

    constructor(container: HTMLElement) {
        super();
        this.model = new CVerticalSliderModel();
        this.viewport = new CVerticalSliderViewport(container);
    }
}