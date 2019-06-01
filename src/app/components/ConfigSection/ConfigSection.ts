import { Utils } from '../../utils/Utils';
import { Switch } from '../Switch/Switch';
import ConfigSectionAttributeHooks from './structures/ConfigSectionAttributeHooks';
import ConfigSectionClassHooks from './structures/ConfigSectionClassHooks';

export class ConfigSection {

    private componentElement: HTMLElement;
    private visible: boolean;

    constructor(container: HTMLElement) {
        this.construct(container);
        this.visible = false;
    }

    private construct(hostElement: HTMLElement): void {
        const template: string = require('./config-section.html');
        const templateFragment: DocumentFragment = Utils.convertToDocumentFragment(template);
        this.componentElement = templateFragment.firstChild as HTMLElement;
        hostElement.append(this.componentElement);

        const themeSection: HTMLElement = Utils.getElementByAttribute(this.componentElement, ConfigSectionAttributeHooks.sectionTheme);
        new Switch(themeSection);
    }

    public getToggleCallback(): () => void {
        return () => this.toggle();
    }

    private toggle(): void {
        if (this.visible) {
            this.visible = false;
            this.componentElement.classList.add(ConfigSectionClassHooks.hidden);
        } else {
            this.visible = true;
            this.componentElement.classList.remove(ConfigSectionClassHooks.hidden);
        }
    }
}