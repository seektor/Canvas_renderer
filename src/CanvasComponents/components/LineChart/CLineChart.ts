import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { ViewportCtor } from '../../../CanvasRenderer/interfaces/ViewportCtor';
import { CLineChartModel } from './CLineChartModel';
import { CLineChartViewport } from './CLineChartViewport';

export class CLineChart extends AbstractCanvasComponent {

    protected model: CLineChartModel;
    protected viewport: CLineChartViewport;

    constructor() {
        const viewportCtor: ViewportCtor<CLineChartViewport, CLineChartModel> = (params) => new CLineChartViewport(params);
        super(viewportCtor);
        this.model = new CLineChartModel();
    }

}