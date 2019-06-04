import { Observable, Subject } from 'rxjs';
import { AbstractCanvasModel } from '../../../CanvasRenderer/AbstractCanvasModel';
import { DataType, VariableMetadata } from '../../../Database/Redux/JarvisDb/types/DataTypes';
import { IHostFlatDisplay } from './interfaces/IHostFlatDisplay';
import { FlatDisplayViewMode } from './structures/FlatDisplayViewMode';

export class CFlatDisplayModel extends AbstractCanvasModel {

    public readonly onDataDidChange$: Observable<void>;
    private dataDidChange$: Subject<void>;
    private readonly onRefreshData$: Observable<void>;
    public refreshData$: Subject<void>;

    private metadata: VariableMetadata;
    private value: number;
    private previousValue: number;
    private host: IHostFlatDisplay;
    private viewMode: FlatDisplayViewMode;

    constructor(viewMode: FlatDisplayViewMode, host: IHostFlatDisplay) {
        super();
        this.viewMode = viewMode;
        this.host = host;
        this.dataDidChange$ = new Subject();
        this.onDataDidChange$ = this.dataDidChange$.asObservable();
        this.refreshData$ = new Subject();
        this.onRefreshData$ = this.refreshData$.asObservable();
        this.init();
    }

    public getViewMode(): FlatDisplayViewMode {
        return this.viewMode;
    }

    public getMetadata(): VariableMetadata {
        return this.metadata;
    }

    public getValue(): number {
        return this.value;
    }

    public getDifference(): number {
        return this.value - this.previousValue;
    }

    private init(): void {
        this.metadata = { max: 1, min: 0, type: DataType.Number };
        this.value = 0;
        this.previousValue = 0;
        this.onRefreshData$.subscribe(() => this.refreshData());
        this.requestMetadata();
    }

    private refreshData(): void {
        this.host.requestVariableValue((value) => {
            this.setData(value);
        });
    }

    private requestMetadata(): void {
        this.host.requestVariableMetadata((metadata) => {
            this.setMetadata(metadata);
            this.refreshData();
        });
    }

    private setMetadata(metadata: VariableMetadata): void {
        this.metadata = metadata;
    }

    private setData(value: number): void {
        this.previousValue = this.value;
        this.value = value;
        this.dataDidChange$.next();
        this.forceRender$.next();
    }

}