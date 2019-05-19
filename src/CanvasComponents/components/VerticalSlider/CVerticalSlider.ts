import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { ViewportCtor } from '../../../CanvasRenderer/interfaces/ViewportCtor';
import { CVerticalSliderModel } from './CVerticalSliderModel';
import { CVerticalSliderViewport } from './CVerticalSliderViewport';
import { ISliderHandlers } from './interfaces/ISliderHandlers';

export class CVerticalSlider extends AbstractCanvasComponent {

    protected model: CVerticalSliderModel;
    protected viewport: CVerticalSliderViewport;

    constructor() {
        const viewportCtor: ViewportCtor<CVerticalSliderViewport, CVerticalSliderModel> = (params) => new CVerticalSliderViewport(params);
        super(viewportCtor);
        this.model = new CVerticalSliderModel();
    }

    public getSliderHandlers(): ISliderHandlers {
        return {
            setScrollWrapperDisplaySize: (sd) => this.model.setScrollWrapperDisplaySize(sd),
            setScrollWrapperScrollSize: (ss) => this.model.setScrollWrapperScrollSize(ss)
        }
    }
}