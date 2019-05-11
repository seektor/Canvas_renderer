import { TDimensions } from '../structures/TDimensions';

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

    public static logMessage(message: string, color: string): void {
        console.log(`%c ${message}`, `color: ${color}`);
    }

    public static clampValue(value: number, min: number, max: number): number {
        return Math.min(Math.max(value, min), max);
    }

    public static isNullOrUndefined<T>(arg: T | null | undefined): arg is null | undefined {
        return (arg == null) || (typeof arg === `undefined`);
    }
}