import { AbstractCanvasViewport } from "../../CanvasRenderer/AbstractCanvasViewport";
import { CRectBaseLayer } from "../testLayers/RectBaseLayer/CRectBaseLayer";
import { TDimensions } from "../../CanvasRenderer/structures/TDimensions";
import { ILayer } from "../../CanvasRenderer/interfaces/ILayer";
import Colors from "../../UIHelpers/Colors";
import { TLayerRelativePosition } from "../../CanvasRenderer/structures/TLayerRelativePosition";
import { TViewportParams } from "../../CanvasRenderer/structures/TViewportParams";
import { CVerticalSlider } from "../VerticalSlider/CVerticalSlider";
// import { CHorizontalSlider } from "../HorizontalSlider/CHorizontalSlider";
import ResizeService from "../../app/services/resizeService/ResizeService";
import { ILayerHost } from "../../CanvasRenderer/interfaces/ILayerHost";

export class CFlatGridViewport extends AbstractCanvasViewport implements ILayerHost {

    private contentPosition: TLayerRelativePosition;
    private verticalSliderPosition: TLayerRelativePosition;
    private horizontalSliderPosition: TLayerRelativePosition;
    private relativePositionMap: WeakMap<ILayer, TLayerRelativePosition> = new WeakMap();

    constructor(params: TViewportParams) {
        super(params);
        this.setRelativePositions();
        this.createLayers();
        this.setResizeService();
        this.renderStage();
    }

    // TODO: Has to be refactored, missing mainStage
    public getSubLayerRelativePosition(subLayer: ILayer): TLayerRelativePosition | null {
        switch (subLayer) {
            case (this.getMainStage()):
                const containerDimensions: TDimensions = this.getContainerDimensions();
                return { dX: 0, dY: 0, ...containerDimensions };
            case (this.subComponents[0].getMainStage()):
                return this.verticalSliderPosition;
            // case (this.subComponents[1].getMainStage()):
            //     return this.verticalSliderPosition;
            default:
                return this.contentPosition;
        }
    }

    // TODO: THere has to be a better way of preventing it from having to write it manually every time.
    private setResizeService() {
        if (!this.isHosted) {
            ResizeService.subscribeToWindow(this.container, () => requestAnimationFrame(() => {
                const containerDimensions: TDimensions = this.getContainerDimensions();
                this.setRelativePositions(containerDimensions);
                this.onResize();
                this.renderStage();
            }));
        }
    }

    private setRelativePositions(currentStageDimensions?: TDimensions) {
        const stageDimensions: TDimensions = currentStageDimensions || this.getStageDimensions();
        const verticalSliderWidth: number = 20;
        const horizontalSliderHeight: number = 20;
        this.contentPosition = {
            dX: 0,
            dY: 0,
            height: stageDimensions.height - horizontalSliderHeight,
            width: stageDimensions.width - verticalSliderWidth
        };
        this.horizontalSliderPosition = {
            dX: 0,
            dY: stageDimensions.height - horizontalSliderHeight,
            height: horizontalSliderHeight,
            width: stageDimensions.width - verticalSliderWidth
        };
        this.verticalSliderPosition = {
            dX: stageDimensions.width - verticalSliderWidth,
            dY: 0,
            height: stageDimensions.height - horizontalSliderHeight,
            width: verticalSliderWidth
        }
    }

    protected createLayers() {
        const stageDimensions: TDimensions = this.getStageDimensions();
        const backgroundLayer: ILayer = new CRectBaseLayer(this, { backgroundColor: Colors.LIGHT_BLUE, height: stageDimensions.height, width: stageDimensions.width });
        const headerLayer: ILayer = new CRectBaseLayer(this, { backgroundColor: Colors.GREEN, ...this.contentPosition });
        const verticalSliderComponent: CVerticalSlider = new CVerticalSlider();
        verticalSliderComponent.createViewport({
            container: this.container,
            stageParams: {
                displayCanvas: this.getDisplayCanvas(),
                ...this.verticalSliderPosition
            }
        });
        // const horizontalSliderComponent: CHorizontalSlider = new CHorizontalSlider();
        // horizontalSliderComponent.createViewport({
        //     container: this.container,
        //     stageParams: {
        //         displayCanvas: this.getDisplayCanvas(),
        //         ...this.horizontalSliderPosition
        //     }
        // });
        this.subComponents.push(verticalSliderComponent);
        this.addLayer(backgroundLayer, headerLayer, verticalSliderComponent.getMainStage()); // horizontalSliderComponent.getMainStage());
    }
}