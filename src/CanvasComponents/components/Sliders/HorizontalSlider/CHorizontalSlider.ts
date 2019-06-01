import { AbstractCanvasComponent } from '../../../../CanvasRenderer/AbstractCanvasComponent';
import { ISliderHandlers } from '../interfaces/ISliderHandlers';
import { CHorizontalSliderModel } from './CHorizontalSliderModel';
import { CHorizontalSliderViewport } from './CHorizontalSliderViewport';

export class CHorizontalSlider extends AbstractCanvasComponent {

    protected model: CHorizontalSliderModel;
    protected viewport: CHorizontalSliderViewport;

    constructor() {
        super();
        this.model = new CHorizontalSliderModel();
        this.viewport = new CHorizontalSliderViewport(this.model);
    }

    public getSliderHandlers(): ISliderHandlers {
        return {
            onSliderRatioDidChange$: this.model.onSliderRatioDidChange$,
            setScrollWrapperDisplaySize: (sd, nc) => this.model.setScrollWrapperDisplaySize(sd, nc),
            setScrollWrapperScrollSize: (ss) => this.model.setScrollWrapperScrollSize(ss),
            setVisibility: (isVisible) => this.viewport.setVisibility(isVisible)
        }
    }
}