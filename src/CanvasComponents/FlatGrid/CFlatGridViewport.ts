import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { CRectBaseLayer } from "../testLayers/RectBaseLayer/CRectBaseLayer";
import { TDimensions } from "../../CanvasRenderer/structures/TDimensions";
import { ILayer } from "../../CanvasRenderer/interfaces/ILayer";
import Colors from "../../UIHelpers/Colors";
import { TLayerRelativePosition } from "../../CanvasRenderer/structures/TLayerRelativePosition";
import { TViewportParams } from "../../CanvasRenderer/structures/TViewportParams";
import { CVerticalSlider } from "../VerticalSlider/CVerticalSlider";
import { CHorizontalSlider } from "../HorizontalSlider/CHorizontalSlider";

export class CFlatGridViewport extends AbstractCanvasViewport {

    private contentPosition: TLayerRelativePosition;
    private verticalSliderPosition: TLayerRelativePosition;
    private horizontalSliderPosition: TLayerRelativePosition;

    constructor(params: TViewportParams) {
        super(params);
        this.setRelativePositions();
        this.createLayers();
        this.renderStage();
    }

    private setRelativePositions() {
        const stageDimensions: TDimensions = this.getStageDimensions();
        const verticalSliderWidth: number = 20;
        const horizontalSliderHeight: number = 20;
        this.contentPosition = {
            dx: 0,
            dy: 0,
            height: stageDimensions.height - horizontalSliderHeight,
            width: stageDimensions.width - verticalSliderWidth
        };
        this.horizontalSliderPosition = {
            dx: 0,
            dy: stageDimensions.height - horizontalSliderHeight,
            height: horizontalSliderHeight,
            width: stageDimensions.width - verticalSliderWidth
        };
        this.verticalSliderPosition = {
            dx: stageDimensions.width - verticalSliderWidth,
            dy: 0,
            height: stageDimensions.height - horizontalSliderHeight,
            width: verticalSliderWidth
        }
    }

    protected createLayers() {
        const stageDimensions: TDimensions = this.getStageDimensions();
        const backgroundLayer: ILayer = new CRectBaseLayer({ backgroundColor: Colors.LIGHT_BLUE, height: stageDimensions.height, width: stageDimensions.width });
        const headerLayer: ILayer = new CRectBaseLayer({ backgroundColor: Colors.GREEN, ...this.contentPosition });
        const verticalSliderComponent: CVerticalSlider = new CVerticalSlider();
        verticalSliderComponent.createViewport({
            container: this.container,
            stageParams: {
                displayCanvas: this.getDisplayCanvas(),
                ...this.verticalSliderPosition
            }
        });
        const horizontalSliderComponent: CHorizontalSlider = new CHorizontalSlider();
        horizontalSliderComponent.createViewport({
            container: this.container,
            stageParams: {
                displayCanvas: this.getDisplayCanvas(),
                ...this.horizontalSliderPosition
            }
        });
        this.subComponents.push(verticalSliderComponent);
        this.addLayer(backgroundLayer, headerLayer, verticalSliderComponent.getMainStage(), horizontalSliderComponent.getMainStage());
    }
}