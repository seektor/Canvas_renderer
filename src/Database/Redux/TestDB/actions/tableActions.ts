import { ActionCreator } from "redux";
import { ISetVariableValue, SET_VARIABLE_VALUE } from "../types/VariableActionsTypes";
import { TableData } from "../types/DataTypes";
import { IAddTable, ADD_TABLE } from "../types/TableActionsTypes";

export const addTable: ActionCreator<IAddTable> = (tableName: string, tableData: TableData) => ({
    type: ADD_TABLE,
    tableName,
    tableData
});