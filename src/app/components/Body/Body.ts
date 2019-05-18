import { CDigitalDisplay } from '../../../CanvasComponents/components/DigitalDisplay/CDigitalDisplay';
import { CFlatDisplay } from '../../../CanvasComponents/components/FlatDisplay/CFlatDisplay';
import { CFlatGrid } from '../../../CanvasComponents/components/FlatGrid/CFlatGrid';
import { CGauge } from '../../../CanvasComponents/components/Gauge/CGauge';
import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { PointerEventHandler } from '../../../CanvasRenderer/utils/pointer-event-handler/PointerEventHandler';
import { ReduxJarvisDb } from '../../../Database/Redux/JarvisDb/ReduxJarvisDb';
import CommunicationService from '../../services/communicationService/CommunicationService';
import GIWAttributeHooks from '../../templates/GridItemWrapper/structures/GIWAttributeHooks';
import { Utils } from '../../utils/Utils';

export class Body {

    private bodyElement: HTMLElement;
    private pointerEventHandler: PointerEventHandler;
    private placeholderGridItem: HTMLElement;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    public initialize(): void {
        const reduxJarvisDb: ReduxJarvisDb = new ReduxJarvisDb();
        CommunicationService.setDataProvider(reduxJarvisDb.getStore());

        const gridItemTemplate: string = require('../../templates/GridItemWrapper/grid-item-wrapper.tpl.html');
        this.placeholderGridItem = Utils.convertToDocumentFragment(gridItemTemplate).firstElementChild as HTMLElement;

        const flatGridPlaceholderElement: HTMLElement = document.getElementById('gridPlaceholder');
        const canvasFlatGridComponent: CFlatGrid = new CFlatGrid({ tableName: 'targets' });
        const flatGridElement: HTMLElement = this.createGridItemWithCanvasComponent('Flat grid', canvasFlatGridComponent);
        flatGridPlaceholderElement.append(flatGridElement);

        const digitalDisplayPlaceholderElement: HTMLElement = document.getElementById('digitalDisplayPlaceholder');
        const canvasDigitalDisplayComponent: CDigitalDisplay = new CDigitalDisplay();
        const digitalDisplayElement: HTMLElement = this.createGridItemWithCanvasComponent('Digital Display', canvasDigitalDisplayComponent);
        digitalDisplayPlaceholderElement.appendChild(digitalDisplayElement);

        const gaugePlaceholderElement: HTMLElement = document.getElementById('gaugePlaceholder');
        const canvasGaugeComponent: CGauge = new CGauge();
        const gaugeElement: HTMLElement = this.createGridItemWithCanvasComponent('Gauge', canvasGaugeComponent);
        gaugePlaceholderElement.appendChild(gaugeElement);

        const flatDisplayOnePlaceholderElement: HTMLElement = document.getElementById('flatDisplayPlaceholder_One');
        const canvasFlatDisplayComponent: CFlatDisplay = new CFlatDisplay();
        const flatDisplayElement: HTMLElement = this.createGridItemWithCanvasComponent('Flat Display', canvasFlatDisplayComponent);
        flatDisplayOnePlaceholderElement.appendChild(flatDisplayElement);

        window.dispatchEvent(new Event('resize'));


        // const verticalSliderComponent: CVerticalSlider = new CVerticalSlider();
        // verticalSliderComponent.createViewport(this.bodyElement);
    }

    private createGridItemWithCanvasComponent(title: string, element: AbstractCanvasComponent): HTMLElement {
        const gridElement: HTMLElement = this.placeholderGridItem.cloneNode(true) as HTMLElement;
        const elementTitle: HTMLElement = Utils.getElementByAttribute(gridElement, GIWAttributeHooks.title);
        const elementContent: HTMLElement = Utils.getElementByAttribute(gridElement, GIWAttributeHooks.content);
        elementTitle.innerHTML = title;
        element.createViewport(elementContent);
        return gridElement;
    }

    private construct(container: HTMLElement): void {
        const template: string = require('./body.html');
        const templateFragment: DocumentFragment = Utils.convertToDocumentFragment(template);
        this.bodyElement = templateFragment.firstChild as HTMLElement;
        container.append(this.bodyElement);
    }
}