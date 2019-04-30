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

export interface VariableData {
    value: number;
    metadata: VariableMetadata;
}

export interface TableData {
    values: unknown[],
    metadata: TableMetadata;
}

export interface MainTableData extends TableData {
    values: MainTableRow[];
}

export interface MainTableRow {
    id: number;
    firstName: string;
    gender: string;
    country: string;
    car: string;
    price: number;
    dateOfPurchase: string;
    satisfaction: boolean;
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
        readonly "main": MainTableData;
        readonly [key: string]: TableData;
    },
    readonly allIds: string[]
}

export interface TestDbState {
    readonly variables: VariablesState;
    readonly tables: TablesState;
}