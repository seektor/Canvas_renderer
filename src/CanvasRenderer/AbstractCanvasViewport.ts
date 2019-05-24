import ResizeService from '../app/services/resizeService/ResizeService';
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
import { TCoords } from './structures/TCoords';
import { TDimensions } from './structures/TDimensions';
import { TLayerCoords } from './structures/TLayerCoords';
import { TLayerHostingParams } from './structures/TLayerHostingParams';
import { TParentRelativeLayerPlacement } from './structures/TLayerPlacement';
import { TLayerRect } from './structures/TLayerRect';
import { TLayerRenderParams } from './structures/TLayerRenderParams';
import { ViewportType } from './structures/ViewportType';
import { CanvasBasePainter } from './utils/painter/CanvasBasePainter';
import { Utils } from './utils/Utils';

export abstract class AbstractCanvasViewport implements ILayerHost {

    protected container: HTMLElement | undefined;
    protected model: AbstractCanvasModel;
    protected canvasPainter: CanvasBasePainter;

    protected isInitialized: boolean;
    protected viewportType: ViewportType | undefined;
    protected hostingViewport: AbstractCanvasViewport | undefined;
    protected mainStage: AbstractCanvasStage;
    private displayCanvas: HTMLCanvasElement;
    private displayCanvasContext: CanvasRenderingContext2D;
    protected displayLayerRectExtractor: ILayerParamsExtractor;
    private eventsData: TCanvasViewportEventsData;
    private hasRenderChanges: boolean;

    constructor(model: AbstractCanvasModel) {
        this.model = model;
        this.initSelf();
        this.bindMethods();
    }

    private initSelf(): void {
        this.isInitialized = false;
        this.hasRenderChanges = true;
        this.displayLayerRectExtractor = () => ({ dX: 0, dY: 0, ...this.getContainerDimensions() });
    }

    private bindMethods(): void {
        this.onActionStart = this.onActionStart.bind(this);
        this.onActionMove = this.onActionMove.bind(this);
        this.onActionEnd = this.onActionEnd.bind(this);
        this.onViewportOut = this.onViewportOut.bind(this);
    }

    public getCanvasPainter(): CanvasBasePainter {
        if (!this.canvasPainter) {
            this.canvasPainter = new CanvasBasePainter();
        }
        return this.canvasPainter;
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
        return this.viewportType === ViewportType.Hosted;
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
        this.mainStage.onResize();
        this.render();
    }

    public initViewport(container: HTMLElement, hostingParams: TLayerHostingParams | undefined): void {
        this.container = container;
        if (hostingParams) {
            this.constructHostedViewport(hostingParams);
        } else {
            this.constructMainViewport();
        }
        this.model.onForceRender$.subscribe(() => this.forceRender());
        this.model.onForceRerender$.subscribe(() => this.forceRerender());
        this.isInitialized = true;
        this.model.onViewportInit();
    }

    private constructHostedViewport(hostingParams: TLayerHostingParams): void {
        this.viewportType = ViewportType.Hosted;
        this.hostingViewport = hostingParams.hostingViewport;
        this.displayLayerRectExtractor = hostingParams.displayLayerRectExtractor;
        this.displayCanvas = hostingParams.hostingViewport.getDisplayCanvas();
        this.displayCanvasContext = this.displayCanvas.getContext('2d');
        this.mainStage = this.createMainStage(hostingParams.hostingViewport, () => this.displayLayerRectExtractor(undefined));
    }

    protected abstract createMainStage(layerHost: ILayerHost, layerParamsExtractor: ILayerParamsExtractor): AbstractCanvasStage;

    private constructMainViewport(): void {
        this.viewportType = ViewportType.SelfContained;
        this.createDisplayCanvas(this.getContainerDimensions());
        this.mainStage = this.createMainStage(this, () => this.displayLayerRectExtractor(undefined));
        this.container.appendChild(this.displayCanvas);
        this.setBaseEvents();
        this.eventsData = this.createEmptyEventsData();
        this.updateEventsData();
        this.setResizeService();
    }

    private createEmptyEventsData(): TCanvasViewportEventsData {
        return {
            displayOffsetLeft: 0,
            displayOffsetTop: 0,
            topActiveLayerPlacement: { layer: this.mainStage, ...this.mainStage.getParentRelativeCoords() },
            actionStartLayer: null,
        }
    }

    private setResizeService(): void {
        if (!this.isHosted()) {
            ResizeService.subscribeToWindow(this.container, () => requestAnimationFrame(() => {
                this.onResize();
            }), 500);
        }
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
            this.mainStage.render(this.displayCanvasContext);
            this.hasRenderChanges = false;
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