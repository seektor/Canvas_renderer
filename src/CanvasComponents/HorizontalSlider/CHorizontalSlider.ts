import { CHorizontalSliderModel } from "./CHorizontalSliderModel";
import { CHorizontalSliderViewport } from "./CHorizontalSliderViewport";
import { AbstractCanvasComponent } from "../../CanvasRenderer/AbstractCanvasComponent";
import { ViewportCtor } from "../../CanvasRenderer/interfaces/ViewportCtor";
import { CFlatGridViewport } from "../FlatGrid/CFlatGridViewport";

export class CHorizontalSlider extends AbstractCanvasComponent {

    protected model: CHorizontalSliderModel;
    protected viewport: CHorizontalSliderViewport;
    protected viewportCtor: ViewportCtor<CHorizontalSliderViewport>;

    constructor(container: HTMLElement, delayViewportCreation?: boolean) {
        super(container);
        this.model = new CHorizontalSliderModel();
        this.viewportCtor = (c, p?) => new CHorizontalSliderViewport(c, p);
        if (!delayViewportCreation) {
            this.viewport = this.viewportCtor(container);
        }
    }
}