import { AbstractCanvasBaseLayer } from "./AbstractCanvasBaseLayer";
import { TLayer } from "./structures/TLayer";
import { CanvasPhysicalLayer } from "./CanvasPhysicalLayer";

export abstract class AbstractCanvasCompoundLayer extends AbstractCanvasBaseLayer {

    protected layers: AbstractCanvasBaseLayer[];
    protected physicalLayers: CanvasPhysicalLayer[];
    protected container: HTMLElement

    constructor(layerParams: TLayer, container: HTMLElement) {
        super(layerParams);
        this.container = container;
        this.layers = [];
    }

    protected abstract createLayers(): void;

    protected render() {
        this.layers.forEach(l => l.drawOn(this.layerContext));
    }

}