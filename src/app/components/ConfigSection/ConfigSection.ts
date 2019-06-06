import { Utils } from '../../utils/Utils';
import { Switch } from '../Switch/Switch';
import ConfigSectionAttributeHooks from './structures/ConfigSectionAttributeHooks';
import ConfigSectionClassHooks from './structures/ConfigSectionClassHooks';

export class ConfigSection {

    private componentElement: HTMLElement;
    private visible: boolean;

    constructor(container: HTMLElement, themeChangeCallback: (isChecked: boolean) => void) {
        this.onTransitionEnd = this.onTransitionEnd.bind(this);
        this.construct(container, themeChangeCallback);
        this.visible = false;
    }

    private construct(hostElement: HTMLElement, themeChangeCallback: (isChecked: boolean) => void): void {
        const template: string = require('./config-section.html');
        const templateFragment: DocumentFragment = Utils.convertToDocumentFragment(template);
        this.componentElement = templateFragment.firstChild as HTMLElement;
        this.componentElement.style.display = 'none';
        hostElement.append(this.componentElement);

        const themeSection: HTMLElement = Utils.getElementByAttribute(this.componentElement, ConfigSectionAttributeHooks.sectionTheme);
        new Switch(themeSection, themeChangeCallback);
    }

    public getToggleCallback(): () => void {
        return () => this.toggle();
    }

    private onTransitionEnd(): void {
        this.componentElement.style.display = 'none';
    }

    private toggle(): void {
        if (this.visible) {
            this.visible = false;
            this.componentElement.addEventListener('transitionend', this.onTransitionEnd)
            this.componentElement.classList.add(ConfigSectionClassHooks.hidden);
        } else {
            this.visible = true;
            this.componentElement.removeEventListener('transitionend', this.onTransitionEnd);
            this.componentElement.classList.remove(ConfigSectionClassHooks.hidden);
            this.componentElement.style.display = 'block';
        }
    }
}