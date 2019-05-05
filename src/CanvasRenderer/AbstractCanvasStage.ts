import { ILayer } from './interfaces/ILayer';
import { ILayerHost } from './interfaces/ILayerHost';
import { AbstractCanvasLayer } from './AbstractCanvasLayer';
import { TLayerParams } from './structures/TLayerParams';
import { AbstractCanvasComponent } from './AbstractCanvasComponent';
import { AbstractCanvasModel } from './AbstractCanvasModel';
import { ILayerParamsExtractor } from './interfaces/ILayerParamsExtractor';

export abstract class AbstractCanvasStage extends AbstractCanvasLayer implements ILayerHost {

    private subLayers: ILayer[];
    private subLayersComponentsMap: WeakMap<ILayer, AbstractCanvasComponent>;

    constructor(layerHost: ILayerHost, model: AbstractCanvasModel, layerParamsExtractor: ILayerParamsExtractor) {
        super(layerHost, model, layerParamsExtractor);
        this.subLayers = [];
        this.subLayersComponentsMap = new WeakMap();
    }

    public render(context: CanvasRenderingContext2D): void {
        super.render(context);
    }

    public onResize(): void {
        const layerParams: TLayerParams = this.layerParamsExtractor(this);
        this.updateLayer(layerParams, true);
        this.subLayers.forEach(layer => layer.onResize());
        this.renderSelf();
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
        this.subLayers.forEach(layer => layer.render(this.layerContext));
    }
}