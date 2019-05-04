import { CVerticalSliderModel } from './CVerticalSliderModel';
import { ViewportCtor } from '../../CanvasRenderer/interfaces/ViewportCtor';
import { AbstractCanvasComponent } from '../../CanvasRenderer/AbstractCanvasComponent';
import { CVerticalSliderViewport } from './CVerticalSliderViewport';

export class CVerticalSlider extends AbstractCanvasComponent {

    protected model: CVerticalSliderModel;
    protected viewport: CVerticalSliderViewport;

    constructor() {
        const viewportCtor: ViewportCtor<CVerticalSliderViewport> = (params) => new CVerticalSliderViewport(params);
        super(viewportCtor);
        this.model = new CVerticalSliderModel();
    }
}