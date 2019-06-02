import { AbstractCanvasComponent } from '../../../../CanvasRenderer/AbstractCanvasComponent';
import { IScrollbarHandlers } from '../interfaces/IScrollbarHandlers';
import { CVerticalScrollbarModel } from './CVerticalScrollbarModel';
import { CVerticalScrollbarViewport } from './CVerticalScrollbarViewport';

export class CVerticalScrollbar extends AbstractCanvasComponent {

    protected model: CVerticalScrollbarModel;
    protected viewport: CVerticalScrollbarViewport;

    constructor() {
        super();
        this.model = new CVerticalScrollbarModel();
        this.viewport = new CVerticalScrollbarViewport(this.model);
    }

    public getScrollbarHandlers(): IScrollbarHandlers {
        return {
            onScrollbarRatioDidChange$: this.model.onScrollbarRatioDidChange$,
            setScrollWrapperDisplaySize: (sd, nc) => this.model.setScrollWrapperDisplaySize(sd, nc),
            setScrollWrapperScrollSize: (ss) => this.model.setScrollWrapperScrollSize(ss),
            setVisibility: (isVisible) => this.viewport.setVisibility(isVisible)
        }
    }
}