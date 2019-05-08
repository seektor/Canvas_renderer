import { AbstractCanvasStage } from './AbstractCanvasStage';
import { TDimensions } from './structures/TDimensions';
import { Utils } from './utils/Utils';
import { TAbstractCanvasViewportParams } from './structures/TCanvasViewportParams';
import { ILayerHost } from './interfaces/ILayerHost';
import { PointerEventHandler } from './utils/pointer-event-handler/PointerEventHandler';
import { AbstractCanvasModel } from './AbstractCanvasModel';
import { TLayerRect } from './structures/TLayerRect';
import { ILayerParamsExtractor } from './interfaces/ILayerParamsExtractor';
import { TLayerParams } from './structures/TLayerParams';
import { PointerEventType } from './utils/pointer-event-handler/structures/PointerEventType';
import { TCanvasViewportEventsData } from './structures/TCanvasViewportEventsData';
import { SyntheticEvent } from './utils/pointer-event-handler/structures/SyntheticEvent';
import { TCoords } from './structures/TCoords';
import { ILayer } from './interfaces/ILayer';
import { LayerType } from './structures/LayerType';
import { IStage } from './interfaces/IStage';
import { TLayerCoords } from './structures/TLayerCoords';
import { TLayerPlacement } from './structures/TLayerPlacement';
import { LayerRelativity } from './structures/LayerRelativity';

export abstract class AbstractCanvasViewport implements ILayerHost {

    protected container: HTMLElement;
    protected model: AbstractCanvasModel;

    protected isHosted: boolean;
    protected mainStage: AbstractCanvasStage;
    private displayCanvas: HTMLCanvasElement;
    private displayCanvasContext: CanvasRenderingContext2D;
    private displayLayerRectExtractor: ILayerParamsExtractor;
    private eventsData: TCanvasViewportEventsData;

    constructor(params: TAbstractCanvasViewportParams<AbstractCanvasStage, AbstractCanvasModel>) {
        this.container = params.container;
        this.model = params.model;
        this.bindMethods();
        this.construct(params);
        this.setBaseEvents();
    }

    private bindMethods(): void {
        this.onActionMove = this.onActionMove.bind(this);
    }

    public getMainStage(): AbstractCanvasStage {
        return this.mainStage;
    }

    public getDisplayLayerRect(): TLayerRect {
        const displayLayerParams: TLayerParams = this.displayLayerRectExtractor(this.mainStage);
        return { height: displayLayerParams.height, width: displayLayerParams.width, y: displayLayerParams.dY, x: displayLayerParams.dX };
    }

    protected getContainerDimensions(): TDimensions {
        return Utils.getElementDimensions(this.container);
    }

    protected renderMainStage(): void {
        this.mainStage.render(this.displayCanvasContext);
    }

    protected onResize(): void {
        const containerDimensions: TDimensions = this.getContainerDimensions();
        this.displayCanvas.width = containerDimensions.width;
        this.displayCanvas.height = containerDimensions.height;
        this.updateEventsData();
        this.model.onResize();
        this.mainStage.onResize();
        this.renderMainStage();
    }

    private construct(params: TAbstractCanvasViewportParams<AbstractCanvasStage, AbstractCanvasModel>): void {
        if (params.hostingParams) {
            this.isHosted = true;
            this.displayLayerRectExtractor = params.hostingParams.displayLayerRectExtractor;
            this.displayCanvas = params.hostingParams.displayCanvas;
            this.displayCanvasContext = this.displayCanvas.getContext('2d');
            this.model.setViewport(this);
            this.mainStage = params.mainStageCtor(params.hostingParams.layerHost, params.model, () => params.hostingParams.displayLayerRectExtractor(this.mainStage));
        } else {
            this.isHosted = false;
            const containerDimensions: TDimensions = this.getContainerDimensions();
            this.displayLayerRectExtractor = () => ({ dX: 0, dY: 0, ...this.getContainerDimensions() });
            this.createDisplayCanvas(containerDimensions);
            this.model.setViewport(this);
            this.mainStage = params.mainStageCtor(this, this.model, () => this.displayLayerRectExtractor(this.mainStage));
            params.container.appendChild(this.displayCanvas);
        }
        this.eventsData = { displayOffsetLeft: 0, displayOffsetTop: 0 };
        this.updateEventsData();
        this.model.onMainStageCreation();
    }

    private createDisplayCanvas(dimensions: TDimensions): void {
        const displayCanvas: HTMLCanvasElement = document.createElement(`canvas`);
        displayCanvas.width = dimensions.width;
        displayCanvas.height = dimensions.height;
        displayCanvas.style.display = `block`;
        this.displayCanvasContext = displayCanvas.getContext(`2d`);
        this.displayCanvas = displayCanvas;
    }

    private updateEventsData() {
        const displayClientRect: ClientRect = this.displayCanvas.getBoundingClientRect();
        this.eventsData.displayOffsetLeft = displayClientRect.left;
        this.eventsData.displayOffsetTop = displayClientRect.top;
    }

    private isStage(arg: ILayer): arg is IStage {
        return arg.type === LayerType.Stage;
    }

    private findTopActiveLayerDataFromCoords(coords: TCoords): TLayerPlacement {
        let topLayerPlacement: TLayerPlacement = {
            layer: this.mainStage,
            relativity: LayerRelativity.MainViewport,
            x: coords.x,
            y: coords.y
        }
        const layerExtractor: (layers: ReadonlyArray<ILayer>, layerCoords: TCoords) => void = (layers, layerCoords) => {
            for (let i = layers.length - 1; i >= 0; i--) {
                const layer: ILayer = layers[i];
                const rTranslations: TLayerCoords = layer.getParentRelativeTranslations();
                const localCoords: TCoords = { x: layerCoords.x - rTranslations.x, y: layerCoords.y - rTranslations.y };
                if (layer.isPierced(localCoords)) {
                    topLayerPlacement.layer = layer;
                    topLayerPlacement.x = coords.x - localCoords.x;
                    topLayerPlacement.y = coords.y - localCoords.y;
                    if (this.isStage(layer)) {
                        layerExtractor(layer.getSublayers(), localCoords);
                    }
                    break;
                }
            }
        }
        layerExtractor([topLayerPlacement.layer], coords);
        return topLayerPlacement;
    }

    private setBaseEvents(): void {
        this.displayCanvas.addEventListener('mousemove', this.onActionMove);
    }

    private mapToDisplayCoords(e: MouseEvent): TCoords {
        return { x: e.clientX - this.eventsData.displayOffsetLeft, y: e.clientY - this.eventsData.displayOffsetTop };
    }

    private onActionMove(e: MouseEvent): void {
        const displayCoords: TCoords = this.mapToDisplayCoords(e);
        const layerPlacement: TLayerPlacement = this.findTopActiveLayerDataFromCoords(displayCoords);
    }

}