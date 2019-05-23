import { AbstractCanvasModel } from './AbstractCanvasModel';
import { AbstractCanvasStage } from './AbstractCanvasStage';
import { ILayer } from './interfaces/ILayer';
import { ILayerHost } from './interfaces/ILayerHost';
import { ILayerParamsExtractor } from './interfaces/ILayerParamsExtractor';
import { IStage } from './interfaces/IStage';
import { CursorType } from './structures/CursorType';
import { LayerRelativity } from './structures/LayerRelativity';
import { LayerType } from './structures/LayerType';
import { TCanvasViewportEventsData } from './structures/TCanvasViewportEventsData';
import { TAbstractCanvasViewportParams } from './structures/TCanvasViewportParams';
import { TCoords } from './structures/TCoords';
import { TDimensions } from './structures/TDimensions';
import { TLayerCoords } from './structures/TLayerCoords';
import { TParentRelativeLayerPlacement } from './structures/TLayerPlacement';
import { TLayerRect } from './structures/TLayerRect';
import { TLayerRenderParams } from './structures/TLayerRenderParams';
import { Utils } from './utils/Utils';

export abstract class AbstractCanvasViewport implements ILayerHost {

    protected container: HTMLElement;
    protected model: AbstractCanvasModel;

    protected hostingViewport: AbstractCanvasViewport | null;
    protected mainStage: AbstractCanvasStage;
    private displayCanvas: HTMLCanvasElement;
    private displayCanvasContext: CanvasRenderingContext2D;
    private displayLayerRectExtractor: ILayerParamsExtractor;
    private eventsData: TCanvasViewportEventsData;
    private hasRenderChanges: boolean;

    constructor(params: TAbstractCanvasViewportParams<AbstractCanvasStage, AbstractCanvasViewport, AbstractCanvasModel>) {
        this.container = params.container;
        this.hostingViewport = null;
        this.model = params.model;
        this.hasRenderChanges = true;

        this.bindMethods();
        this.construct(params);
    }

    private bindMethods(): void {
        this.onActionStart = this.onActionStart.bind(this);
        this.onActionMove = this.onActionMove.bind(this);
        this.onActionEnd = this.onActionEnd.bind(this);
        this.onViewportOut = this.onViewportOut.bind(this);
    }

    public getMainStage(): AbstractCanvasStage {
        return this.mainStage;
    }

    public getDisplayCanvas(): HTMLCanvasElement {
        return this.displayCanvas;
    }

    public getLayerDisplayRect(): TLayerRect {
        const displayLayerParams: TLayerRenderParams = this.displayLayerRectExtractor(this.mainStage);
        return { height: displayLayerParams.height, width: displayLayerParams.width, y: displayLayerParams.dY, x: displayLayerParams.dX };
    }

    public setCursor(type: CursorType): void {
        this.displayCanvas.style.cursor = type;
    }

    protected isHosted(): boolean {
        return this.hostingViewport != null;
    }

    public getContainer(): HTMLElement {
        return this.container;
    }

    protected getContainerDimensions(): TDimensions {
        return Utils.getElementDimensions(this.container);
    }

    protected render(): void {
        if (this.hasRenderChanges) {
            this.mainStage.render(this.displayCanvasContext);
            this.hasRenderChanges = false;
        }
    }

    protected onResize(): void {
        const containerDimensions: TDimensions = this.getContainerDimensions();
        this.displayCanvas.width = containerDimensions.width;
        this.displayCanvas.height = containerDimensions.height;
        this.updateEventsData();
        this.model.onResize();
        this.mainStage.onResize();
        this.render();
    }

    private construct(params: TAbstractCanvasViewportParams<AbstractCanvasStage, AbstractCanvasViewport, AbstractCanvasModel>): void {
        if (params.hostingParams) {
            this.constructHostedViewport(params);
        } else {
            this.constructMainViewport(params);
        }
        this.model.onForceRender$.subscribe(() => this.forceRender());
        this.model.onForceRerender$.subscribe(() => this.forceRerender());
    }

    private constructHostedViewport(params: TAbstractCanvasViewportParams<AbstractCanvasStage, AbstractCanvasViewport, AbstractCanvasModel>): void {
        this.hostingViewport = params.hostingParams.hostingViewport;
        this.displayLayerRectExtractor = params.hostingParams.displayLayerRectExtractor;
        this.displayCanvas = params.hostingParams.hostingViewport.getDisplayCanvas();
        this.displayCanvasContext = this.displayCanvas.getContext('2d');
        this.mainStage = params.mainStageCtor({ layerHost: params.hostingParams.layerHost, viewport: params.hostingParams.hostingViewport, model: params.model, layerParamsExtractor: () => params.hostingParams.displayLayerRectExtractor(this.mainStage) });
    }

    private constructMainViewport(params: TAbstractCanvasViewportParams<AbstractCanvasStage, AbstractCanvasViewport, AbstractCanvasModel>): void {
        const containerDimensions: TDimensions = this.getContainerDimensions();
        this.displayLayerRectExtractor = () => ({ dX: 0, dY: 0, ...this.getContainerDimensions() });
        this.createDisplayCanvas(containerDimensions);
        this.mainStage = params.mainStageCtor({ layerHost: this, viewport: this, model: this.model, layerParamsExtractor: () => this.displayLayerRectExtractor(this.mainStage) });
        params.container.appendChild(this.displayCanvas);
        this.setBaseEvents();
        this.eventsData = {
            displayOffsetLeft: 0,
            displayOffsetTop: 0,
            topActiveLayerPlacement: { layer: this.mainStage, ...this.mainStage.getParentRelativeCoords() },
            actionStartLayer: null,
        };
        this.updateEventsData();
    }

    public forceRender(): void {
        if (this.isHosted()) {
            this.hostingViewport.forceRender();
        } else {
            this.render();
        }
    }

    public forceRerender(): void {
        if (this.isHosted()) {
            this.hostingViewport.forceRerender();
        } else {
            this.mainStage.rerenderSelf();
            this.forceRender();
        }
    }

    public notifyRenderChanges() {
        this.hasRenderChanges = true;
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

    private findTopActiveLayerDataFromCoords(coords: TCoords): TParentRelativeLayerPlacement {
        let topLayerPlacement: TParentRelativeLayerPlacement = {
            layer: this.mainStage,
            relativity: LayerRelativity.Parent,
            x: coords.x,
            y: coords.y
        }
        const layerExtractor: (layers: ReadonlyArray<ILayer>, layerCoords: TCoords) => void = (layers, layerCoords) => {
            for (let i = layers.length - 1; i >= 0; i--) {
                const layer: ILayer = layers[i];
                const rTranslations: TLayerCoords = layer.getParentRelativeCoords();
                const localCoords: TCoords = { x: layerCoords.x - rTranslations.x, y: layerCoords.y - rTranslations.y };
                if (layer.isVisible() && layer.isPierced(localCoords)) {
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
        this.displayCanvas.addEventListener('mousedown', this.onActionStart);
        this.displayCanvas.addEventListener('mousemove', this.onActionMove);
        this.displayCanvas.addEventListener('mouseup', this.onActionEnd);
        this.displayCanvas.addEventListener('mouseout', this.onViewportOut);
    }

    private mapToDisplayCoords(e: MouseEvent): TCoords {
        return { x: e.clientX - this.eventsData.displayOffsetLeft, y: e.clientY - this.eventsData.displayOffsetTop };
    }

    private onActionStart(e: MouseEvent): void {
        const displayCoords: TCoords = this.mapToDisplayCoords(e);
        const layerPlacement: TParentRelativeLayerPlacement = this.findTopActiveLayerDataFromCoords(displayCoords);
        const localCoords: TCoords = { x: displayCoords.x - layerPlacement.x, y: displayCoords.y - layerPlacement.y };
        this.eventsData.actionStartLayer = {
            layer: layerPlacement.layer,
            relativity: LayerRelativity.MainViewport,
            x: displayCoords.x,
            y: displayCoords.y
        };
        layerPlacement.layer.onActionStart(localCoords);
        this.render();
    }

    private onActionMove(e: MouseEvent): void {
        // Utils.logMessage('===== Action Move =====', Colors.GREEN);
        // console.time("Action Move time");
        const displayCoords: TCoords = this.mapToDisplayCoords(e);
        const layerPlacement: TParentRelativeLayerPlacement = this.findTopActiveLayerDataFromCoords(displayCoords);
        const localCoords: TCoords = { x: displayCoords.x - layerPlacement.x, y: displayCoords.y - layerPlacement.y };
        if (this.eventsData.topActiveLayerPlacement.layer !== layerPlacement.layer) {
            this.eventsData.topActiveLayerPlacement.layer.onActionLeave();
            layerPlacement.layer.onActionEnter(localCoords);
            this.eventsData.topActiveLayerPlacement = layerPlacement;
        }
        layerPlacement.layer.onActionMove(localCoords);
        if (this.eventsData.actionStartLayer) {
            this.eventsData.actionStartLayer.layer.onActionDrag({ dX: displayCoords.x - this.eventsData.actionStartLayer.x, dY: displayCoords.y - this.eventsData.actionStartLayer.y });
        }
        this.render();
        // console.timeEnd("Action Move time");
    }

    private onActionEnd(e: MouseEvent): void {
        if (!this.eventsData.actionStartLayer) {
            return;
        }
        const displayCoords: TCoords = this.mapToDisplayCoords(e);
        const layerPlacement: TParentRelativeLayerPlacement = this.findTopActiveLayerDataFromCoords(displayCoords);
        const localCoords: TCoords = { x: displayCoords.x - layerPlacement.x, y: displayCoords.y - layerPlacement.y };
        this.eventsData.actionStartLayer.layer.onActionEnd(localCoords);
        this.eventsData.actionStartLayer = null;
    }

    private onViewportOut(): void {
        this.eventsData.topActiveLayerPlacement.layer.onActionLeave();
        this.eventsData.actionStartLayer && this.eventsData.actionStartLayer.layer.onActionEnd({ x: -1, y: -1 });
        this.eventsData.topActiveLayerPlacement.layer = this.mainStage;
        this.eventsData.topActiveLayerPlacement.x = 0;
        this.eventsData.topActiveLayerPlacement.y = 0;
        this.eventsData.actionStartLayer = null;
        this.render();
    }
}