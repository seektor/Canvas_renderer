import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';

export class CTextModel extends AbstractCanvasModel {

    private data: string[];

    constructor() {
        super();
        this.data = [
            'Energy level: 89%',
            'Suit damage: 13%',
            `Temperature: 16.2${String.fromCharCode(176)}`
        ];
    }

    public getData(): string[] {
        return this.data;
    }
}