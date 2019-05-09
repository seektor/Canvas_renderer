import { ILayer } from './interfaces/ILayer';
import { ILayerHost } from './interfaces/ILayerHost';
import { AbstractCanvasLayer } from './AbstractCanvasLayer';
import { TLayerParams } from './structures/TLayerParams';
import { AbstractCanvasComponent } from './AbstractCanvasComponent';
import { AbstractCanvasModel } from './AbstractCanvasModel';
import { ILayerParamsExtractor } from './interfaces/ILayerParamsExtractor';
import { LayerType } from './structures/LayerType';
import { ILayerViewport } from './interfaces/ILayerViewport';
import Colors from '../UIHelpers/Colors';

export abstract class AbstractCanvasStage extends AbstractCanvasLayer implements ILayerHost {

    public readonly type: LayerType = LayerType.Stage;

    private subLayers: ILayer[];
    private subLayersComponentsMap: WeakMap<ILayer, AbstractCanvasComponent>;
    private hasRenderChanges: boolean;

    constructor(layerHost: ILayerHost, globalViewport: ILayerViewport, model: AbstractCanvasModel, layerParamsExtractor: ILayerParamsExtractor) {
        super(layerHost, globalViewport, model, layerParamsExtractor);
        this.hasRenderChanges = true;
        this.subLayers = [];
        this.subLayersComponentsMap = new WeakMap();
    }

    public render(context: CanvasRenderingContext2D): void {
        if (this.hasRenderChanges) {
            console.log(`%c Render stage's children: ${this.subLayers.map(sl => sl.constructor.name)}`, `color: ${Colors.DEEP_ORANGE}`);
            this.renderSelf(false);
        }
        console.log(`%c Render stage: ${this.constructor.name}`, `color: ${Colors.ORANGE}`);
        super.render(context);
        this.hasRenderChanges = false;
    }

    public getSublayers(): ReadonlyArray<ILayer> {
        return this.subLayers;
    }

    public onResize(): void {
        const layerParams: TLayerParams = this.layerParamsExtractor(this);
        this.updateLayer(layerParams, true);
        this.subLayers.forEach(layer => layer.onResize());
        this.renderSelf(true);
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

    protected renderSelf(notifyChanges: boolean): void {
        this.subLayers.forEach(layer => layer.render(this.layerContext));
        if (notifyChanges) {
            this.notifyRenderChanges();
        }
    }

    public notifyRenderChanges(): void {
        this.hasRenderChanges = true;
        this.layerHost.notifyRenderChanges();
    }

    public getHasRenderChanges(): boolean {
        return this.hasRenderChanges;
    }
}