import { TDimensions } from "../structures/TDimensions";

export class Utils {

    public static getElementDimensions(element: HTMLElement): TDimensions {
        return {
            height: element.offsetHeight,
            width: element.offsetWidth,
        }
    }

    public static noop(): void {
        return undefined;
    }
}