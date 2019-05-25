import { AbstractCanvasComponent } from './AbstractCanvasComponent';
import { AbstractCanvasLayer } from './AbstractCanvasLayer';
import { AbstractCanvasModel } from './AbstractCanvasModel';
import { AbstractCanvasViewport } from './AbstractCanvasViewport';
import { ILayer } from './interfaces/ILayer';
import { ILayerHost } from './interfaces/ILayerHost';
import { LayerType } from './structures/LayerType';
import { TLayerParams } from './structures/TLayerParams';
import { TLayerRenderParams } from './structures/TLayerRenderParams';

export abstract class AbstractCanvasStage extends AbstractCanvasLayer implements ILayerHost {

    public readonly type: LayerType = LayerType.Stage;

    private subLayers: ILayer[];
    private subLayersComponentsMap: WeakMap<ILayer, AbstractCanvasComponent>;
    private hasRenderChanges: boolean;

    constructor(params: TLayerParams<AbstractCanvasModel, AbstractCanvasViewport, unknown>) {
        super(params);
        this.hasRenderChanges = true;
        this.subLayers = [];
        this.subLayersComponentsMap = new WeakMap();
    }

    public render(context: CanvasRenderingContext2D): void {
        if (this.hasRenderChanges) {
            this.renderSelf();
        }
        super.render(context);
        this.hasRenderChanges = false;
    }

    public rerenderSelf(notifyChanges: boolean = false): void {
        this.clear();
        this.renderSelfLayer();
        this.subLayers.forEach((layer) => layer.rerenderSelf());
        this.subLayers.forEach(layer => layer.isVisible() && layer.render(this.layerContext));
        this.hasRenderChanges = false;
        if (notifyChanges) {
            this.notifyRenderChanges();
        }
    }

    public getSublayers(): ReadonlyArray<ILayer> {
        return this.subLayers;
    }

    public onResize(): void {
        const layerParams: TLayerRenderParams = this.layerParamsExtractor(this);
        this.updateLayer(layerParams, true);
        this.onAfterLayerUpdate();
        this.subLayers.forEach(layer => layer.onResize());
        this.renderSelf();
        this.notifyRenderChanges();
    }

    protected abstract createLayers(): void;

    protected addLayer(layer: ILayer): void {
        this.subLayers.push(layer);
    }

    protected addComponent(component: AbstractCanvasComponent): void {
        const layer: ILayer = component.getMainStage();
        this.addLayer(layer);
        this.subLayersComponentsMap.set(layer, component);
    }

    protected renderSelf(): void {
        this.clear();
        this.renderSelfLayer();
        this.subLayers.forEach(layer => layer.isVisible() && layer.render(this.layerContext));
    }

    protected renderSelfLayer(): void { }

    public notifyRenderChanges(): void {
        this.hasRenderChanges = true;
        this.layerHost.notifyRenderChanges();
    }

    public getHasRenderChanges(): boolean {
        return this.hasRenderChanges;
    }
}