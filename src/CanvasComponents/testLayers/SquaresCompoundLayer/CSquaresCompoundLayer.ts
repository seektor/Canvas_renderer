import { AbstractCanvasBaseLayer } from "../../../CanvasRenderer/AbstractCanvasBaseLayer";
import { AbstractCanvasCompoundLayer } from "../../../CanvasRenderer/AbstractCanvasCompoundLayer";
import { CRectBaseLayer } from "../RectBaseLayer/CRectBaseLayer";
import { TLayer } from "../../../CanvasRenderer/structures/TLayer";
import { Utils } from "../../utils/Utils";
import { CanvasPhysicalLayer } from "../../../CanvasRenderer/CanvasPhysicalLayer";

export class CSquaresCompoundLayer extends AbstractCanvasCompoundLayer {

    constructor(params: TLayer, container: HTMLElement) {
        super(params, container);
        this.createLayers();
        this.render();
    }

    protected createLayers() {
        const backgroundLayer: CRectBaseLayer = new CRectBaseLayer({
            backgroundColor: Utils.getRandomColor(),
            height: this.layerHeight,
            width: this.layerWidth
        });
        const subSquareLayers: CRectBaseLayer[] = [];
        const subSquareWidth: number = this.layerWidth / 3;
        const subSquareHeight: number = this.layerHeight / 3;
        for (let rowIndex: number = 0; rowIndex < 3; rowIndex++) {
            for (let columnIndex: number = 0; columnIndex < 3; columnIndex++) {
                subSquareLayers.push(new CRectBaseLayer({
                    backgroundColor: Utils.getRandomColor(),
                    width: subSquareWidth,
                    height: subSquareHeight,
                    dX: columnIndex * subSquareWidth * 2,
                    dY: rowIndex * subSquareHeight * 2
                }))
            }
        }
        // change to method later on
        this.layers.push(backgroundLayer, ...subSquareLayers);
        const newPhysicalLayer = new CanvasPhysicalLayer({
            height: this.layerHeight,
            width: this.layerWidth
        })
        const lElement = newPhysicalLayer.getLayerElement();
        lElement.style.position = "absolute";
        this.container.append(lElement);


        this.render();
    }

}