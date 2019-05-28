import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { CVerticalSliderModel } from './CVerticalSliderModel';
import { CVerticalSliderViewport } from './CVerticalSliderViewport';
import { ISliderHandlers } from './interfaces/ISliderHandlers';

export class CVerticalSlider extends AbstractCanvasComponent {

    protected model: CVerticalSliderModel;
    protected viewport: CVerticalSliderViewport;

    constructor() {
        super();
        this.model = new CVerticalSliderModel();
        this.viewport = new CVerticalSliderViewport(this.model);
    }

    public getSliderHandlers(): ISliderHandlers {
        return {
            onSelectedRatioDidChange$: this.model.onSelectedRatioDidChange$,
            setScrollWrapperDisplaySize: (sd, nc) => this.model.setScrollWrapperDisplaySize(sd, nc),
            setScrollWrapperScrollSize: (ss) => this.model.setScrollWrapperScrollSize(ss),
            setVisibility: (isVisible) => this.viewport.setVisibility(isVisible)
        }
    }
}