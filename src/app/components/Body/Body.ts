import { Utils } from '../../utils/Utils';
import { PointerEventHandler } from '../../../CanvasRenderer/utils/pointer-event-handler/PointerEventHandler';
import { CVerticalSlider } from '../../../CanvasComponents/components/VerticalSlider/CVerticalSlider';

export class Body {

    private bodyElement: HTMLElement;
    private pointerEventHandler: PointerEventHandler;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    public initialize(): void {
        // const reduxTestDb: ReduxTestDb = new ReduxTestDb();
        // CommunicationService.setDataProvider(reduxTestDb.getStore());
        // CommunicationService.createAvgSummaryTable("main", "country", "price");

        // const canvasFlatGridComponent: CFlatGrid = new CFlatGrid();
        // canvasFlatGridComponent.createViewport({ container: this.bodyElement });
        const verticalSliderComponent: CVerticalSlider = new CVerticalSlider();
        verticalSliderComponent.createViewport(this.bodyElement);
    }

    private construct(container: HTMLElement): void {
        const template: string = require('./body.html');
        const templateFragment: DocumentFragment = Utils.convertToDocumentFragment(template);
        this.bodyElement = templateFragment.firstChild as HTMLElement;
        container.append(this.bodyElement);
    }
}