import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { CGaugeModel } from './CGaugeModel';
import { CGaugeViewport } from './CGaugeViewport';
import { TGaugeParams } from './structures/TGaugeParams';

export class CGauge extends AbstractCanvasComponent {

    protected model: CGaugeModel;
    protected viewport: CGaugeViewport;

    constructor(gaugeParams: TGaugeParams) {
        super();
        this.model = new CGaugeModel(gaugeParams);
        this.viewport = new CGaugeViewport(this.model);
    }

}