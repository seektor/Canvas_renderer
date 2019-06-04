import { DifferenceDirection } from '../../../../app/structures/DifferenceDirection';
import { AbstractCanvasLayer } from '../../../../CanvasRenderer/AbstractCanvasLayer';
import { TLayerParams } from '../../../../CanvasRenderer/structures/TLayerParams';
import { CFlatDisplayModel } from '../CFlatDisplayModel';
import { CFlatDisplayViewport } from '../CFlatDisplayViewport';
import { FlatDisplayViewMode } from '../structures/FlatDisplayViewMode';
import { CFlatDisplayPainter } from '../styles/CFlatDisplayPainter';

export class CFlatDisplayContentLayer extends AbstractCanvasLayer {

    protected model: CFlatDisplayModel;
    protected viewport: CFlatDisplayViewport;
    private canvasPainter: CFlatDisplayPainter;

    constructor(params: TLayerParams<CFlatDisplayModel, CFlatDisplayViewport, unknown>) {
        super(params);
        this.canvasPainter = this.viewport.getCanvasPainter();
        this.setEvents();
        this.renderSelf();
        this.notifyRenderChanges();
    }

    private setEvents(): void {
        this.model.onDataDidChange$.subscribe(() => {
            this.renderSelf();
            this.notifyRenderChanges();
        });
    }

    public renderSelf(): void {
        this.clear();
        switch (this.model.getViewMode()) {
            case FlatDisplayViewMode.Accomplishment:
                this.canvasPainter.drawValueInAccomplishmentMode(this.layerContext, this.getLayerRect(), this.model.getValue().toString(), this.model.getMetadata().max.toString());
                break;
            case FlatDisplayViewMode.Difference:
                const valueDifference: number = this.model.getDifference();
                const valueDifferenceText: string = this.getDifferenceText(valueDifference);
                const direction: DifferenceDirection = this.getValueDifferenceDirection(valueDifference);
                this.canvasPainter.drawValueInDifferenceMode(this.layerContext, this.getLayerRect(), this.model.getValue().toString(), valueDifferenceText, direction);
                break;
            case FlatDisplayViewMode.FlatValue:
                this.canvasPainter.drawValueInFlatMode(this.layerContext, this.getLayerRect(), "xD");
                break;
        }
    }

    private getDifferenceText(valueDifference: number): string {
        if (valueDifference > 0) {
            return `+${valueDifference}`;
        } else if (valueDifference < 0) {
            return `${valueDifference}`;
        } else {
            return '-';
        }
    }

    private getValueDifferenceDirection(valueDifference: number): DifferenceDirection {
        if (valueDifference > 0) {
            return DifferenceDirection.Increase;
        } else if (valueDifference < 0) {
            return DifferenceDirection.Decrease;
        } else {
            return DifferenceDirection.None;
        }
    }
}