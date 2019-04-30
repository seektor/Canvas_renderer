import { Action } from "redux";

export const SET_VARIABLE_VALUE = "SET_VARIABLE_VALUE";

export interface ISetVariableValue extends Action<typeof SET_VARIABLE_VALUE> {
    varId: string;
    value: number;
};

export type VariableActions = ISetVariableValue;