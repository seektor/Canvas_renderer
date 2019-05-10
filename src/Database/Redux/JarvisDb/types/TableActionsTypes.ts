import { Action } from "redux";
import { TableData } from "./DataTypes";

export const ADD_TABLE = "ADD_TABLE";

export interface IAddTable extends Action<typeof ADD_TABLE> {
    tableName: string;
    tableData: TableData;
};

export type TableActions = IAddTable;