import { CVerticalSliderModel } from "./CVerticalSliderModel";
import { ViewportCtor } from "../../CanvasRenderer/interfaces/ViewportCtor";
import { AbstractCanvasComponent } from "../../CanvasRenderer/AbstractCanvasComponent";
import { CVerticalSliderViewport } from "./CVerticalSliderViewport";

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