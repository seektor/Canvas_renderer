import { TDimensions } from "./structures/TDimensions";
import { Utils } from "./utils/Utils";
import { CanvasPhysicalLayer } from "./CanvasPhysicalLayer";
import { AbstractCanvasBaseLayer } from "./AbstractCanvasBaseLayer";

export class CanvasViewportRenderer {

    private container: HTMLElement;
    private physicalLayers: CanvasPhysicalLayer[];

    constructor(container: HTMLElement) {
        this.container = container;
        this.physicalLayers = [];
    }

    public renderView() {
        this.physicalLayers.forEach(l => l.renderView());
    }

    public getViewportDimensions(): TDimensions {
        return Utils.getElementDimensions(this.container);
    }

    public addPhysicalLayer(append: boolean = true) {
        const displayDimensions: TDimensions = Utils.getElementDimensions(this.container);
        const physicalLayer: CanvasPhysicalLayer = new CanvasPhysicalLayer(displayDimensions);
        const layerElement: HTMLElement = physicalLayer.getLayerElement();
        if (this.physicalLayers.length > 0) {
            layerElement.style.position = 'absolute';
        }
        this.physicalLayers.push(physicalLayer);
        if (append) {
            this.container.appendChild(layerElement);
        }
    }

    public getLayers(): CanvasPhysicalLayer[] {
        return this.physicalLayers;
    }

    public addBaseLayer(level: number, layer: AbstractCanvasBaseLayer) {
        this.physicalLayers[level].addLayer(layer);
    }
}