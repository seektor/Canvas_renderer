import { ActionCreator } from "redux";
import { TableData } from "../types/DataTypes";
import { ADD_TABLE, IAddTable } from "../types/TableActionsTypes";

export const addTable: ActionCreator<IAddTable> = (tableName: string, tableData: TableData) => ({
    type: ADD_TABLE,
    tableName,
    tableData
});