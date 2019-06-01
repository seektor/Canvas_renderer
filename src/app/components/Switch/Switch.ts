import { Utils } from '../../utils/Utils';

export class Switch {

    private componentElement: HTMLElement;

    constructor(container: HTMLElement) {
        this.construct(container);
    }

    private construct(hostElement: HTMLElement): void {
        const template: string = require('./switch.html');
        const templateFragment: DocumentFragment = Utils.convertToDocumentFragment(template);
        this.componentElement = templateFragment.firstChild as HTMLElement;
        hostElement.append(this.componentElement);
    }
}