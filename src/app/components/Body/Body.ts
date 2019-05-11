import { Utils } from '../../utils/Utils';
import { PointerEventHandler } from '../../../CanvasRenderer/utils/pointer-event-handler/PointerEventHandler';
import { CVerticalSlider } from '../../../CanvasComponents/components/VerticalSlider/CVerticalSlider';
import { CFlatGrid } from '../../../CanvasComponents/components/FlatGrid/CFlatGrid';
import { ReduxJarvisDb } from '../../../Database/Redux/JarvisDb/ReduxJarvisDb';
import CommunicationService from '../../services/communicationService/CommunicationService';

export class Body {

    private bodyElement: HTMLElement;
    private pointerEventHandler: PointerEventHandler;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    public initialize(): void {
        const reduxJarvisDb: ReduxJarvisDb = new ReduxJarvisDb();
        CommunicationService.setDataProvider(reduxJarvisDb.getStore());

        const canvasFlatGridComponent: CFlatGrid = new CFlatGrid({ tableName: 'targets' });
        canvasFlatGridComponent.createViewport(this.bodyElement);
        // const verticalSliderComponent: CVerticalSlider = new CVerticalSlider();
        // verticalSliderComponent.createViewport(this.bodyElement);
    }

    private construct(container: HTMLElement): void {
        const template: string = require('./body.html');
        const templateFragment: DocumentFragment = Utils.convertToDocumentFragment(template);
        this.bodyElement = templateFragment.firstChild as HTMLElement;
        container.append(this.bodyElement);
    }
}