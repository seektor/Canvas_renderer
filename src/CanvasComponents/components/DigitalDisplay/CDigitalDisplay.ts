import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { CDigitalDisplayModel } from './CDigitalDIsplayModel';
import { CDigitalDisplayViewport } from './CDigitalDisplayViewport';

export class CDigitalDisplay extends AbstractCanvasComponent {

    protected model: CDigitalDisplayModel;
    protected viewport: CDigitalDisplayViewport;

    constructor() {
        super();
        this.model = new CDigitalDisplayModel();
        this.viewport = new CDigitalDisplayViewport(this.model);
    }

}