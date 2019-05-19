import { CDigitalDisplay } from '../../../CanvasComponents/components/DigitalDisplay/CDigitalDisplay';
import { CFlatDisplay } from '../../../CanvasComponents/components/FlatDisplay/CFlatDisplay';
import { CFlatGrid } from '../../../CanvasComponents/components/FlatGrid/CFlatGrid';
import { CGauge } from '../../../CanvasComponents/components/Gauge/CGauge';
import { TGaugeParams } from '../../../CanvasComponents/components/Gauge/structures/TGaugeParams';
import { CLineChart } from '../../../CanvasComponents/components/LineChart/CLineChart';
import { CText } from '../../../CanvasComponents/components/Text/CText';
import { AbstractCanvasComponent } from '../../../CanvasRenderer/AbstractCanvasComponent';
import { ReduxJarvisDb } from '../../../Database/Redux/JarvisDb/ReduxJarvisDb';
import Colors from '../../../UIHelpers/Colors';
import CommunicationService from '../../services/communicationService/CommunicationService';
import GIWAttributeHooks from '../../templates/GridItemWrapper/structures/GIWAttributeHooks';
import { Utils } from '../../utils/Utils';

export class Body {

    private bodyElement: HTMLElement;
    private placeholderGridItem: HTMLElement;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    public initialize(): void {
        const reduxJarvisDb: ReduxJarvisDb = new ReduxJarvisDb();
        CommunicationService.setDataProvider(reduxJarvisDb.getStore());

        const gridItemTemplate: string = require('../../templates/GridItemWrapper/grid-item-wrapper.tpl.html');
        this.placeholderGridItem = Utils.convertToDocumentFragment(gridItemTemplate).firstElementChild as HTMLElement;

        const flatGridPlaceholderElement: HTMLElement = document.getElementById('body__grid-Placeholder');
        const canvasFlatGridComponent: CFlatGrid = new CFlatGrid({ tableName: 'targets' });
        const flatGridElement: HTMLElement = this.createGridItemWithCanvasComponent('Flat grid', canvasFlatGridComponent);
        flatGridPlaceholderElement.append(flatGridElement);

        const digitalDisplayPlaceholderElement: HTMLElement = document.getElementById('body__digital-display-placeholder');
        const canvasDigitalDisplayComponent: CDigitalDisplay = new CDigitalDisplay();
        const digitalDisplayElement: HTMLElement = this.createGridItemWithCanvasComponent('Digital Display', canvasDigitalDisplayComponent);
        digitalDisplayPlaceholderElement.appendChild(digitalDisplayElement);

        const gaugePlaceholderElement: HTMLElement = document.getElementById('body__gauge-placeholder');
        const canvasGaugeComponent: CGauge = new CGauge(this.getGaugeParams());
        const gaugeElement: HTMLElement = this.createGridItemWithCanvasComponent('Jet Power', canvasGaugeComponent);
        gaugePlaceholderElement.appendChild(gaugeElement);

        const textPlaceholderElement: HTMLElement = document.getElementById('body__text-placeholder');
        const canvasTextComponent: CText = new CText();
        const textElement: HTMLElement = this.createGridItemWithCanvasComponent('Summary', canvasTextComponent);
        textPlaceholderElement.appendChild(textElement);

        const lineChartPlaceholderElement: HTMLElement = document.getElementById('body__line-chart-placeholder');
        const canvasLineChartComponent: CLineChart = new CLineChart();
        const lineChartElement: HTMLElement = this.createGridItemWithCanvasComponent('Stark Industries’ revenue', canvasLineChartComponent);
        lineChartPlaceholderElement.appendChild(lineChartElement);

        const flatDisplayPlaceholderElement_One: HTMLElement = document.getElementById('body__flat-display-placeholder--one');
        const canvasFlatDisplayComponent_One: CFlatDisplay = new CFlatDisplay();
        const flatDisplayElement_One: HTMLElement = this.createGridItemWithCanvasComponent('Stark Industries’ revenue', canvasFlatDisplayComponent_One);
        flatDisplayPlaceholderElement_One.appendChild(flatDisplayElement_One);

        const flatDisplayPlaceholderElement_Two: HTMLElement = document.getElementById('body__flat-display-placeholder--two');
        const canvasFlatDisplayComponent_Two: CFlatDisplay = new CFlatDisplay();
        const flatDisplayElement_Two: HTMLElement = this.createGridItemWithCanvasComponent('Flat Display', canvasFlatDisplayComponent_Two);
        flatDisplayPlaceholderElement_Two.appendChild(flatDisplayElement_Two);

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

    private getGaugeParams(): TGaugeParams {
        return {
            colorPercentageRanges: [
                {
                    color: Colors.ORANGE,
                    from: 55,
                    to: 80
                },
                {
                    color: Colors.RED,
                    from: 80,
                    to: 100
                }
            ],
            max: 100,
            min: 0
        }
    }
}
