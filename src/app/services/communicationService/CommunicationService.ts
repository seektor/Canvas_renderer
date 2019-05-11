import { Store } from "redux";
import { TestDbState, TableData, TargetsTableRow, DataType, TField, FieldType, TableMetadata } from "../../../Database/Redux/JarvisDb/types/DataTypes";

class CommunicationService {

    private static instance: CommunicationService;
    private store: Store<TestDbState>;

    public static getInstance(): CommunicationService {
        return this.instance || (this.instance = new this());
    }

    public setDataProvider(store: Store) {
        this.store = store;
    }

    public getTableData<T>(tableName: string, from: number, to: number): T[] {
        const tableData: TableData = this.store.getState().tables.byId[tableName];
        return tableData.values.slice(from, Math.min(to, tableData.metadata.rowCount)) as T[];
    }

    public getTableMetadata(tableName): TableMetadata {
        const tableData: TableData = this.store.getState().tables.byId[tableName];
        return tableData.metadata;
    }

    public getTableNames(): string[] {
        return this.store.getState().tables.allIds;
    }

    public createAvgSummaryTable(tableName: 'targets', characteristicId: string, metricId: string): string {
        // const summaryTableName: string = `${tableName}_summary_avg_${characteristicId}_${metricId}`;
        // const alreadyExists: boolean = this.store.getState().tables.allIds.includes(summaryTableName);
        // if (!alreadyExists) {
        //     const avgSummaryTableData: TableData = this.createAvgSummaryTableData(tableName, characteristicId, metricId);
        //     this.store.dispatch(addTable(summaryTableName, avgSummaryTableData));
        // }
        // return summaryTableName;
        return '';
    }

    // private createAvgSummaryTableData(tableName: 'targets', characteristicId: string, metricId: string): TableData {
    //     const metricValues: Map<string, number[]> = new Map();
    //     const rows: TargetsTableRow[] = this.store.getState().tables.byId[tableName].values;
    //     const mainFields = this.store.getState().tables.byId[tableName].metadata.fields;
    //     const mainCharacteristic: TField = mainFields.find(f => f.id === characteristicId);
    //     rows.forEach(row => {
    //         const characteristicValue: string = row[characteristicId];
    //         if (!metricValues.has(characteristicValue)) {
    //             metricValues.set(characteristicValue, []);
    //         }
    //         metricValues.get(characteristicValue).push(row[metricId]);
    //     });
    //     const summaryTableValues = [...metricValues.keys()].map(key => {
    //         const arr: number[] = metricValues.get(key);
    //         const average: number = arr.reduce((p, c) => p + c, 0) / arr.length;
    //         return {
    //             [key]: average
    //         }
    //     });
    //     const tableData: TableData = {
    //         metadata: {
    //             fields: [
    //                 {
    //                     dataType: DataType.String,
    //                     id: characteristicId,
    //                     name: mainCharacteristic.name,
    //                     fieldType: FieldType.Characteristic
    //                 },
    //                 {
    //                     dataType: DataType.Number,
    //                     id: metricId,
    //                     name: `Avg_${mainCharacteristic.name}`,
    //                     fieldType: FieldType.Metric
    //                 }
    //             ],
    //             rowCount: summaryTableValues.length
    //         },
    //         values: summaryTableValues
    //     }
    //     return tableData;
    // }
}

export default CommunicationService.getInstance();