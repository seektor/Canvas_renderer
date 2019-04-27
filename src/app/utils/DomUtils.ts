export class DomUtils {

    public static convertToDocumentFragment(tagString: string): DocumentFragment {
        return document.createRange().createContextualFragment(tagString);
    }
}