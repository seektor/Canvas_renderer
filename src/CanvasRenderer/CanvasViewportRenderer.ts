import { CanvasVirtualLayersRenderer } from "./CanvasVirtualLayersRenderer";
import { CanvasPhysicalLayer } from "./CanvasPhysicalLayer";
import { TDimensions } from "./structures/TDimensions";
import { Utils } from "./utils/Utils";

export class CanvasViewportRenderer {

    private container: HTMLElement;
    private physicalLayers: CanvasPhysicalLayer[];

    constructor(container: HTMLElement) {
        this.container = container;
        this.physicalLayers = [];
    }

    public addPhysicalLayer() {
        const displayDimensions: TDimensions = Utils.getElementDimensions(this.container);
        const physicalLayer: CanvasPhysicalLayer = new CanvasPhysicalLayer(displayDimensions);
        this.physicalLayers.push(physicalLayer);
        const layerElement: HTMLElement = physicalLayer.getLayerElement();
        if (this.physicalLayers.length > 0) {
            layerElement.style.position = 'absolute';
        }
        this.container.appendChild(layerElement);
    }
}