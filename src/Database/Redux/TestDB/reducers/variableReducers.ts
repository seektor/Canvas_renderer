import { VariablesState } from "../types/DataTypes";
import { VariableActions, SET_VARIABLE_VALUE } from "../types/VariableActionsTypes";

const defaultVariableState: VariablesState = {
    allIds: [],
    byId: {}
}

export function variableReducers(state: VariablesState = defaultVariableState, action: VariableActions): VariablesState {
    switch (action.type) {
        case SET_VARIABLE_VALUE:
            return setVariableValueReducer(state, action);
        default:
            return state;
    }
}

function setVariableValueReducer(state: VariablesState, action: VariableActions): VariablesState {
    if (typeof state.byId[action.varId] === 'undefined') {
        console.warn(`The variable id ${action.varId} does not exist!`);
        return state;
    }
    return {
        ...state,
        byId: {
            ...state.byId,
            [action.varId]: {
                ...state.byId[action.varId], value: action.value
            }
        }
    };
}