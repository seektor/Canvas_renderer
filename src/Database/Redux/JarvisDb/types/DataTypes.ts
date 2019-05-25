export enum DataType {
    Number = "Number",
    String = "String",
    Date = "Date",
    Boolean = "Boolean"
}

export enum FieldType {
    Metric = "Metric",
    Characteristic = "Characteristic",
    Id = "Id"
}

export interface TField {
    id: string;
    name: string;
    dataType: DataType;
    fieldType: FieldType
}

export interface DataRow {
    [key: string]: unknown;
}

export interface VariableData {
    value: number;
    metadata: VariableMetadata;
}

export interface TableData {
    values: DataRow[],
    metadata: TableMetadata;
}

export interface TargetsTableData extends TableData {
    values: TargetsTableRow[];
}

export interface TargetsTableRow {
    id: number;
    isActive: boolean;
    bounty: string;
    name: string;
    age: number;
    gender: string;
    address: string;
    latitude: number;
    longitude: number;
}

export interface VariableMetadata {
    readonly min: number;
    readonly max: number;
    readonly type: DataType.Number;
}

export interface TableMetadata {
    rowCount: number;
    fields: TField[]
}

export interface VariablesState {
    readonly byId: {
        readonly [key: string]: VariableData;
    },
    readonly allIds: string[]
}

export interface TablesState {
    readonly byId: {
        readonly "targets": TargetsTableData;
        readonly [key: string]: TableData;
    },
    readonly allIds: string[]
}

export interface TestDbState {
    readonly variables: VariablesState;
    readonly tables: TablesState;
}