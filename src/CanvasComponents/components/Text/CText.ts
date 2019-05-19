import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { ViewportCtor } from '../../../CanvasRenderer/interfaces/ViewportCtor';
import { CTextModel } from './CTextModel';
import { CTextViewport } from './CTextViewport';

export class CText extends AbstractCanvasComponent {

    protected model: CTextModel;
    protected viewport: CTextViewport;

    constructor() {
        const viewportCtor: ViewportCtor<CTextViewport, CTextModel> = (params) => new CTextViewport(params);
        super(viewportCtor);
        this.model = new CTextModel();
    }

}