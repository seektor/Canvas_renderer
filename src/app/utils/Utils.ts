export class Utils {

    public static convertToDocumentFragment(tagString: string): DocumentFragment {
        return document.createRange().createContextualFragment(tagString);
    }

    public static getElementByAttribute(element: HTMLElement, attribute: string): HTMLElement {
        return element.querySelector(`[${attribute}]`);
    }
}