import { AbstractCanvasComponent } from '../../../../CanvasRenderer/AbstractCanvasComponent';
import { IScrollbarHandlers } from '../interfaces/IScrollbarHandlers';
import { CHorizontalScrollbarModel } from './CHorizontalScrollbarModel';
import { CHorizontalScrollbarViewport } from './CHorizontalScrollbarViewport';

export class CHorizontalScrollbar extends AbstractCanvasComponent {

    protected model: CHorizontalScrollbarModel;
    protected viewport: CHorizontalScrollbarViewport;

    constructor() {
        super();
        this.model = new CHorizontalScrollbarModel();
        this.viewport = new CHorizontalScrollbarViewport(this.model);
    }

    public getScrollbarHandlers(): IScrollbarHandlers {
        return {
            onScrollbarRatioDidChange$: this.model.onScrollbarRatioDidChange$,
            setScrollWrapperDisplaySize: (sd) => this.model.setScrollWrapperDisplaySize(sd),
            setScrollWrapperScrollSize: (ss) => this.model.setScrollWrapperScrollSize(ss),
            setVisibility: (isVisible) => this.viewport.setVisibility(isVisible)
        }
    }
}