import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { CLineChartModel } from './CLineChartModel';
import { CLineChartViewport } from './CLineChartViewport';

export class CLineChart extends AbstractCanvasComponent {

    protected model: CLineChartModel;
    protected viewport: CLineChartViewport;

    constructor() {
        super();
        this.model = new CLineChartModel();
        this.viewport = new CLineChartViewport(this.model);
    }

}