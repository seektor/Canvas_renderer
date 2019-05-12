import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { ViewportCtor } from '../../../CanvasRenderer/interfaces/ViewportCtor';
import { CDigitalDisplayModel } from './CDigitalDIsplayModel';
import { CDigitalDisplayViewport } from './CDigitalDisplayViewport';

export class CDigitalDisplay extends AbstractCanvasComponent {

    protected model: CDigitalDisplayModel;
    protected viewport: CDigitalDisplayViewport;

    constructor() {
        const viewportCtor: ViewportCtor<CDigitalDisplayViewport, CDigitalDisplayModel> = (params) => new CDigitalDisplayViewport(params);
        super(viewportCtor);
        this.model = new CDigitalDisplayModel();
    }

}