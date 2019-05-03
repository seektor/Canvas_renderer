import { ILayer } from './interfaces/ILayer';
import { ILayerHost } from './interfaces/ILayerHost';
import { AbstractCanvasBaseLayer } from './AbstractCanvasBaseLayer';
import { TRenderLayer } from './structures/TRenderLayer';
import { TPosAndDim } from './structures/TPosAndDim';
import { ILayerPosAndDimExtractor } from './interfaces/ILayerPosAndDimExtractor';
import { AbstractCanvasComponent } from './AbstractCanvasComponent';

export abstract class AbstractCanvasStage extends AbstractCanvasBaseLayer implements ILayerHost {

    private subLayers: ILayer[];
    private subLayersRelativePosAndDimExtractorsMap: WeakMap<ILayer, ILayerPosAndDimExtractor>;
    private subLayersComponentsMap: WeakMap<ILayer, AbstractCanvasComponent>;

    constructor(layerHost: ILayerHost, layerParams: TRenderLayer) {
        super(layerHost, layerParams);
        this.subLayers = [];
        this.subLayersRelativePosAndDimExtractorsMap = new WeakMap();
        this.subLayersComponentsMap = new WeakMap();
    }

    public getContainerElement(): HTMLElement {
        return this.layerHost.getContainerElement();
    }

    public getDisplayCanvas(): HTMLCanvasElement {
        return this.layerHost.getDisplayCanvas();
    }

    public render(context: CanvasRenderingContext2D) {
        super.render(context);
    }

    public onResize(): void {
        this.updateLayerDimensions();
        this.subLayers.forEach(layer => layer.onResize());
        this.renderSelf();
    }

    public getSubLayerRelativePosAndDim(subLayer: ILayer): TPosAndDim {
        const layerExtractor: ILayerPosAndDimExtractor = this.subLayersRelativePosAndDimExtractorsMap.get(subLayer);
        return layerExtractor(subLayer);
    }

    protected abstract createLayers(): void;

    protected addLayer(layer: ILayer, layerPositionExtractor: ILayerPosAndDimExtractor): void {
        this.subLayers.push(layer);
        this.subLayersRelativePosAndDimExtractorsMap.set(layer, layerPositionExtractor);
    }

    protected addComponent(component: AbstractCanvasComponent, layerPositionExtractor: ILayerPosAndDimExtractor): void {
        const layer: ILayer = component.getMainStage();
        this.addLayer(layer, layerPositionExtractor);
        this.subLayersComponentsMap.set(layer, component);
    }

    protected renderSelf(): void {
        this.subLayers.forEach(layer => layer.render(this.layerContext));
    }
}