import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { TAbstractCanvasViewportParams, TCanvasViewportParams } from '../../../CanvasRenderer/structures/TCanvasViewportParams';
import { TLayerParams } from '../../../CanvasRenderer/structures/TLayerParams';
import { TRange } from '../../../CanvasRenderer/structures/TRange';
import { CFlatGridModel } from './CFlatGridModel';
import { CFlatGridMainStage } from './stages/CFlatGridMainStage';
import { CFlatGridPainter } from './styles/CFLatGridPainter';

export class CFlatGridViewport extends AbstractCanvasViewport implements ILayerHost {

    private readonly minimumRowBuffer: number = 60;

    protected mainStage: CFlatGridMainStage;
    protected model: CFlatGridModel;
    protected canvasPainter: CFlatGridPainter;

    constructor(params: TCanvasViewportParams<CFlatGridModel>) {
        super({
            ...params,
            mainStageCtor: (p: TLayerParams<CFlatGridModel, CFlatGridViewport, unknown>): CFlatGridMainStage => {
                return new CFlatGridMainStage(p);
            }
        } as TAbstractCanvasViewportParams<CFlatGridMainStage, CFlatGridViewport, CFlatGridModel>);

        this.canvasPainter = new CFlatGridPainter();
        this.render();
    }

    public getTotalRowsHeight(): number {
        return this.model.getRowCount() * this.canvasPainter.getRowHeight();
    }

    public getCanvasPainter(): CFlatGridPainter {
        return this.canvasPainter;
    }

    public getRowBufferHeight(): number {
        return this.getRowBuffer() * this.canvasPainter.getRowHeight();
    }

    private getRowBuffer(): number {
        const displayRowsBuffer: number = this.getNumberOfRowsPerDisplay() * 2;
        const calculatedRowsBuffer: number = Math.max(displayRowsBuffer, this.minimumRowBuffer);
        return Math.min(calculatedRowsBuffer, this.model.getRowCount());
    }

    private createDataRequestRange(firstVisibleRowNumber: number, lastVisibleRowNumber): TRange {
        const rowBuffer: number = this.getRowBuffer();
        const visibleRowsCount: number = lastVisibleRowNumber - firstVisibleRowNumber;
        const rowBufferPerSide: number = Math.ceil(rowBuffer / 2);
        let from: number = Math.max(0, firstVisibleRowNumber - rowBufferPerSide);
        const fromDiff: number = rowBufferPerSide - (firstVisibleRowNumber - from);
        let to: number = Math.min(this.model.getRowCount(), from + visibleRowsCount + rowBufferPerSide + fromDiff);
        const diff: number = rowBuffer - (to - from);
        from = Math.max(0, from - diff);
        return { from, to };
    }

    private getNumberOfRowsPerDisplay(): number {
        return Math.ceil(this.canvasPainter.getDataLayerDisplayHeight() / this.canvasPainter.getRowHeight());
    }

}