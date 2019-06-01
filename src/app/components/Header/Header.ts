import { Utils } from '../../utils/Utils';
import HeaderAttributeHooks from './structures/HeaderAttributeHooks';

export class Header {

    private headerElement: HTMLElement;
    private configButton: HTMLElement;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    public setConfigCallback(callback: () => void): void {
        this.configButton.addEventListener('click', callback);
    }

    private construct(hostElement: HTMLElement): void {
        const template: string = require('./header.html');
        const templateFragment: DocumentFragment = Utils.convertToDocumentFragment(template);
        this.headerElement = templateFragment.firstChild as HTMLElement;
        hostElement.append(this.headerElement);

        this.configButton = Utils.getElementByAttribute(this.headerElement, HeaderAttributeHooks.buttonConfig);
    }
}