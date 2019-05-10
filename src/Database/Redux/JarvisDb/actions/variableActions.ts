import { ActionCreator } from "redux";
import { ISetVariableValue, SET_VARIABLE_VALUE } from "../types/VariableActionsTypes";

export const setVariableValue: ActionCreator<ISetVariableValue> = (varId: string, value: number) => ({
    type: SET_VARIABLE_VALUE,
    varId,
    value
});