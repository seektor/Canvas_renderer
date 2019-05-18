import { TRect } from "../../CanvasRenderer/structures/TRect";

export class Utils {

    public static getRandomColor(): string {
        const letters: string = '0123456789ABCDEF';
        let color: string = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static getBiggestSquareRect(width: number, height: number): TRect {
        const lesserDimension: number = height <= width ? height : width;
        const dX: number = lesserDimension === height ? Math.round((width - lesserDimension) * 0.5) : 0;
        const dY: number = lesserDimension === height ? 0 : Math.round((height - lesserDimension) * 0.5);
        return {
            x: dX,
            y: dY,
            height: lesserDimension,
            width: lesserDimension
        }
    }
}