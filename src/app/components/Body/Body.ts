import { CFlatDisplay } from '../../../CanvasComponents/components/FlatDisplay/CFlatDisplay';
import { CFlatGrid } from '../../../CanvasComponents/components/FlatGrid/CFlatGrid';
import { PointerEventHandler } from '../../../CanvasRenderer/utils/pointer-event-handler/PointerEventHandler';
import { ReduxJarvisDb } from '../../../Database/Redux/JarvisDb/ReduxJarvisDb';
import CommunicationService from '../../services/communicationService/CommunicationService';
import GIWAttributeHooks from '../../templates/GridItemWrapper/structures/GIWAttributeHooks';
import { Utils } from '../../utils/Utils';

export class Body {

    private bodyElement: HTMLElement;
    private pointerEventHandler: PointerEventHandler;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    public initialize(): void {
        const reduxJarvisDb: ReduxJarvisDb = new ReduxJarvisDb();
        CommunicationService.setDataProvider(reduxJarvisDb.getStore());

        const gridItemTemplate: string = require('../../templates/GridItemWrapper/grid-item-wrapper.tpl.html');
        const gridItemElement: HTMLElement = Utils.convertToDocumentFragment(gridItemTemplate).firstElementChild as HTMLElement;

        const gridElement: HTMLElement = gridItemElement.cloneNode(true) as HTMLElement;
        const gridTitle: HTMLElement = Utils.getElementByAttribute(gridElement, GIWAttributeHooks.title);
        const gridContent: HTMLElement = Utils.getElementByAttribute(gridElement, GIWAttributeHooks.content);
        gridTitle.innerHTML = 'Flat grid';
        const flatGridPlaceholderElement: HTMLElement = document.getElementById('gridPlaceholder');
        flatGridPlaceholderElement.append(gridElement);
        const canvasFlatGridComponent: CFlatGrid = new CFlatGrid({ tableName: 'targets' });
        canvasFlatGridComponent.createViewport(gridContent);

        // const digitalDisplayElement: HTMLElement = gridItemElement.cloneNode(true) as HTMLElement;
        // const digitalDisplayTitle: HTMLElement = Utils.getElementByAttribute(digitalDisplayElement, GIWAttributeHooks.title);
        // const digitalDisplayContent: HTMLElement = Utils.getElementByAttribute(digitalDisplayElement, GIWAttributeHooks.content);
        // digitalDisplayTitle.innerHTML = 'Digital Display';
        // const digitalDisplayPlaceholderElement: HTMLElement = document.getElementById('digitalDisplayPlaceholder');
        // digitalDisplayPlaceholderElement.appendChild(digitalDisplayElement);
        // const canvasDigitalDisplayComponent: CDigitalDisplay = new CDigitalDisplay();
        // canvasDigitalDisplayComponent.createViewport(digitalDisplayContent);

        const flatDisplayOneElement: HTMLElement = gridItemElement.cloneNode(true) as HTMLElement;
        const flatDisplayOneTitle: HTMLElement = Utils.getElementByAttribute(flatDisplayOneElement, GIWAttributeHooks.title);
        const flatDisplayContent: HTMLElement = Utils.getElementByAttribute(flatDisplayOneElement, GIWAttributeHooks.content);
        flatDisplayOneTitle.innerHTML = 'Flat Display';
        const flatDisplayOnePlaceholderElement: HTMLElement = document.getElementById('flatDisplayOnePlaceholder');
        flatDisplayOnePlaceholderElement.appendChild(flatDisplayOneElement);
        const canvasFlatDisplayComponent: CFlatDisplay = new CFlatDisplay();
        canvasFlatDisplayComponent.createViewport(flatDisplayContent);


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