import ThemingService from '../../../app/services/themingService/ThemingService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { TRange } from '../../../CanvasRenderer/structures/TRange';
import { CFlatGridModel } from './CFlatGridModel';
import { CFlatGridMainStage } from './stages/CFlatGridMainStage';
import { CFlatGridPainter } from './styles/CFLatGridPainter';

export class CFlatGridViewport extends AbstractCanvasViewport implements ILayerHost {

    private readonly minimumRowBuffer: number = 60;

    protected model: CFlatGridModel;
    protected canvasPainter: CFlatGridPainter;

    constructor(model: CFlatGridModel) {
        super(model);
        this.canvasPainter = new CFlatGridPainter(ThemingService.getTheme());
        ThemingService.onThemeDidChange$.subscribe(() => this.onThemeDidChange());
    }

    private onThemeDidChange(): void {
        this.canvasPainter.applyTheme(ThemingService.getTheme());
        this.forceRerender();
    }

    protected createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): CFlatGridMainStage {
        return new CFlatGridMainStage({ viewport: this, model: this.model, layerHost, layerParamsExtractor });
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