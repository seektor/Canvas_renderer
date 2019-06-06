import { Utils } from '../../utils/Utils';

export class Switch {

    private componentElement: HTMLElement;
    private checkboxElement: HTMLInputElement;
    private canSwitch: boolean;
    private onChangeCallback: (isChecked: boolean) => void;

    constructor(container: HTMLElement, onChangeCallback: (isChecked: boolean) => void) {
        this.canSwitch = true;
        this.onChangeCallback = onChangeCallback;
        this.construct(container);
    }

    private construct(hostElement: HTMLElement): void {
        const template: string = require('./switch.html');
        const templateFragment: DocumentFragment = Utils.convertToDocumentFragment(template);
        this.componentElement = templateFragment.firstChild as HTMLElement;
        this.checkboxElement = this.componentElement.querySelector('input[type=checkbox]');
        this.checkboxElement.checked = true;
        this.checkboxElement.addEventListener('change', (e: Event) => this.onCheckboxChange(e));
        hostElement.append(this.componentElement);
    }

    private onCheckboxChange(e: Event): void {
        if (this.canSwitch) {
            this.onChangeCallback(this.checkboxElement.checked);
            this.canSwitch = false;
            setTimeout(() => this.canSwitch = true, 1000);
        } else {
            this.checkboxElement.checked = !this.checkboxElement.checked;
        }
    }
}