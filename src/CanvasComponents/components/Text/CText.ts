import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { CTextModel } from './CTextModel';
import { CTextViewport } from './CTextViewport';

export class CText extends AbstractCanvasComponent {

    protected model: CTextModel;
    protected viewport: CTextViewport;

    constructor() {
        super();
        this.model = new CTextModel();
        this.viewport = new CTextViewport(this.model);
    }

}