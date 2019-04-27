export class Utils {

    public static convertToDocumentFragment(tagString: string): DocumentFragment {
        return document.createRange().createContextualFragment(tagString);
    }
}