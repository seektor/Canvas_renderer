import { CVerticalSliderModel } from "./CVerticalSliderModel";
import { CVerticalSliderViewport } from "./CVerticalSliderViewport";
import { ViewportCtor } from "../../CanvasRenderer/interfaces/ViewportCtor";
import { CHorizontalSliderViewport } from "../HorizontalSlider/CHorizontalSliderViewport";
import { AbstractCanvasComponent } from "../../CanvasRenderer/AbstractCanvasComponent";

export class CVerticalSlider extends AbstractCanvasComponent {

    protected model: CVerticalSliderModel;
    protected viewport: CVerticalSliderViewport;
    protected viewportCtor: ViewportCtor<CVerticalSliderViewport>;

    constructor() {
        super();
        this.model = new CVerticalSliderModel();
        this.viewportCtor = (params) => new CVerticalSliderViewport(params);
    }
}