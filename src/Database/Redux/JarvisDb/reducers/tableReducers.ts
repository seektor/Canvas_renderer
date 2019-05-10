import { TablesState } from "../types/DataTypes";
import { TableActions, ADD_TABLE } from "../types/TableActionsTypes";

const defaultTableState: TablesState = {
    allIds: [],
    byId: {
        'targets': { values: [], metadata: { fields: [], rowCount: 0 } }
    }
}

export function tableReducers(state: TablesState = defaultTableState, action: TableActions): TablesState {
    switch (action.type) {
        case ADD_TABLE:
            return addTableReducer(state, action);
        default:
            return state;
    }
}

function addTableReducer(state: TablesState, action: TableActions): TablesState {
    return {
        allIds: state.allIds.concat(action.tableName),
        byId: {
            ...state.byId,
            [action.tableName]: action.tableData
        }
    }
}