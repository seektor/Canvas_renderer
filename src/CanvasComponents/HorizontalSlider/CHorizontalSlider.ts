import { CHorizontalSliderModel } from "./CHorizontalSliderModel";
import { CHorizontalSliderViewport } from "./CHorizontalSliderViewport";
import { AbstractCanvasComponent } from "../../CanvasRenderer/AbstractCanvasComponent";
import { ViewportCtor } from "../../CanvasRenderer/interfaces/ViewportCtor";

export class CHorizontalSlider extends AbstractCanvasComponent {

    protected model: CHorizontalSliderModel;
    protected viewport: CHorizontalSliderViewport;
    protected viewportCtor: ViewportCtor<CHorizontalSliderViewport>;

    constructor() {
        super();
        this.model = new CHorizontalSliderModel();
        this.viewportCtor = (params) => new CHorizontalSliderViewport(params);
    }
}