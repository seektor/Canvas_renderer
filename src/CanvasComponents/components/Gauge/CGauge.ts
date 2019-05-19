import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { ViewportCtor } from '../../../CanvasRenderer/interfaces/ViewportCtor';
import { CGaugeModel } from './CGaugeModel';
import { CGaugeViewport } from './CGaugeViewport';
import { TGaugeParams } from './structures/TGaugeParams';

export class CGauge extends AbstractCanvasComponent {

    protected model: CGaugeModel;
    protected viewport: CGaugeViewport;

    constructor(gaugeParams: TGaugeParams) {
        const viewportCtor: ViewportCtor<CGaugeViewport, CGaugeModel> = (params) => new CGaugeViewport(params);
        super(viewportCtor);
        this.model = new CGaugeModel(gaugeParams);
    }

}