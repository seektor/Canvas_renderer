import { CVerticalSliderModel } from "./CVerticalSliderModel";
import { CVerticalSliderViewport } from "./CVerticalSliderViewport";
import { ViewportCtor } from "../../CanvasRenderer/interfaces/ViewportCtor";
import { CHorizontalSliderViewport } from "../HorizontalSlider/CHorizontalSliderViewport";
import { AbstractCanvasComponent } from "../../CanvasRenderer/AbstractCanvasComponent";

export class CVerticalSlider extends AbstractCanvasComponent {

    protected model: CVerticalSliderModel;
    protected viewport: CVerticalSliderViewport;
    protected viewportCtor: ViewportCtor<CVerticalSliderViewport>;

    constructor(container: HTMLElement, delayViewportCreation?: boolean) {
        super(container);
        this.model = new CVerticalSliderModel();
        this.viewportCtor = (c, p?) => new CVerticalSliderViewport(c, p);
        if (!delayViewportCreation) {
            this.viewport = this.viewportCtor(container);
        }
    }
}