import { Store } from "redux";
import { setVariableValue } from "../../../Database/Redux/JarvisDb/actions/variableActions";
import { DataRow, TableData, TableMetadata, TestDbState, VariableMetadata } from "../../../Database/Redux/JarvisDb/types/DataTypes";
import { CallbackFunction } from "../../structures/CallbackFunction";
import IntervalService from "../intervalService/IntervalService";
import { IntervalType } from "../intervalService/structures/IntervalType";

class CommunicationService {

    private static instance: CommunicationService;
    private store: Store<TestDbState>;

    public static getInstance(): CommunicationService {
        return this.instance || (this.instance = new this());
    }

    private constructor() {
        IntervalService.subscribe(IntervalType["15000ms"], () => this.updateVariableValue('drones'));
    }

    private updateVariableValue(variableId: string) {
        const variableMetaData = this.store.getState().variables.byId[variableId].metadata;
        const newValue: number = Math.round(Math.random() * (variableMetaData.max - variableMetaData.min) + variableMetaData.min);
        this.store.dispatch(setVariableValue(variableId, newValue));
    }

    public setDataProvider(store: Store) {
        this.store = store;
    }

    public getTableData(tableName: string, from: number, to: number): DataRow[] {
        const tableData: TableData = this.store.getState().tables.byId[tableName];
        return tableData.values.slice(from, Math.min(to, tableData.metadata.rowCount));
    }

    public getTableMetadata(tableName): TableMetadata {
        const tableData: TableData = this.store.getState().tables.byId[tableName];
        return tableData.metadata;
    }

    public getTableNames(): string[] {
        return this.store.getState().tables.allIds;
    }

    public getVariableValue(variableId: string): number {
        return this.store.getState().variables.byId[variableId].value;
    }

    public getVariableMetadata(variableId: string): VariableMetadata {
        return this.store.getState().variables.byId[variableId].metadata;
    }

    public subscribe(callback: CallbackFunction): void {
        this.store.subscribe(callback);
    }
}

export default CommunicationService.getInstance();