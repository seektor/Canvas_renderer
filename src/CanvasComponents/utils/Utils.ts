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
}