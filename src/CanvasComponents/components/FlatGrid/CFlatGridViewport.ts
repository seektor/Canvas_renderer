import ThemingService from '../../../app/services/themingService/ThemingService';
import { AbstractCanvasViewport } from '../../../CanvasRenderer/AbstractCanvasViewport';
import { ILayerHost } from '../../../CanvasRenderer/interfaces/ILayerHost';
import { ILayerParamsExtractor } from '../../../CanvasRenderer/interfaces/ILayerParamsExtractor';
import { TDimensions } from '../../../CanvasRenderer/structures/TDimensions';
import { TLayerRenderParams } from '../../../CanvasRenderer/structures/TLayerRenderParams';
import { TRange } from '../../../CanvasRenderer/structures/TRange';
import { CFlatGridModel } from './CFlatGridModel';
import { CFlatGridMainStage } from './stages/CFlatGridMainStage';
import { CFlatGridPainter } from './styles/CFLatGridPainter';

export class CFlatGridViewport extends AbstractCanvasViewport implements ILayerHost {

    private readonly minimumRowBuffer: number = 60;
    private readonly headerHeight: number = 40;

    private viewportDimensions: TDimensions;

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

    public calculateHeaderWidth(): number {
        return this.model.getColumnsData().reduce((p, c) => p += c.width, 0);
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

    private createDataRequestRange(firstVisibleRowNumber: number, lastVisibleRowNumber: number): TRange {
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

    public onFlatGridResize(): void {
        const layerRect: TLayerRenderParams = this.layerRenderRectExtractor(undefined);
        this.viewportDimensions = { height: layerRect.height, width: layerRect.width };
        const dataRequestRange: TRange = this.createDataRequestRange(0, this.getNumberOfRowsPerDisplay());
        this.model.requestData(dataRequestRange.from, dataRequestRange.to);
    }

    public getDataLayerDisplayHeight(): number {
        return Math.max(this.viewportDimensions.height - this.headerHeight, 0);
    }

    public getHeaderHeight(): number {
        return this.headerHeight;
    }

    private getNumberOfRowsPerDisplay(): number {
        return Math.ceil(this.getDataLayerDisplayHeight() / this.canvasPainter.getRowHeight());
    }

}