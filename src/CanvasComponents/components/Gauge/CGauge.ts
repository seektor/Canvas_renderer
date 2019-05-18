import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { ViewportCtor } from '../../../CanvasRenderer/interfaces/ViewportCtor';
import { CGaugeModel } from './CGaugeModel';
import { CGaugeViewport } from './CGaugeViewport';

export class CGauge extends AbstractCanvasComponent {

    protected model: CGaugeModel;
    protected viewport: CGaugeViewport;

    constructor() {
        const viewportCtor: ViewportCtor<CGaugeViewport, CGaugeModel> = (params) => new CGaugeViewport(params);
        super(viewportCtor);
        this.model = new CGaugeModel();
    }

}