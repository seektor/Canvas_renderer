import { createStore, Store } from 'redux';
import { variableReducers } from "./reducers/variableReducers";
import { tableReducers } from "./reducers/tableReducers";
import { TargetsTableRow, TestDbState, DataType, FieldType } from './types/DataTypes';
import { TestDbActions } from './actions';
import { VariableActions } from './types/VariableActionsTypes';
import { TableActions } from './types/TableActionsTypes';

export class ReduxJarvisDb {

    private targetsTable: TargetsTableRow[] = require('./static/TARGETS.json');
    private store: Store;
    private initialState: TestDbState = {
        variables: {
            allIds: ['varA'],
            byId: {
                'varA': {
                    metadata: {
                        max: 100,
                        min: 0,
                        type: DataType.Number
                    },
                    value: 0
                }
            }
        },
        tables: {
            allIds: ['targets'],
            byId: {
                'targets': {
                    metadata: {
                        rowCount: 1000,
                        fields: [
                            { id: "id", name: "Id", dataType: DataType.Number, fieldType: FieldType.Id },
                            { id: "firstName", name: "First Name", dataType: DataType.String, fieldType: FieldType.Characteristic },
                            { id: "gender", name: "Gender", dataType: DataType.String, fieldType: FieldType.Characteristic },
                            { id: "country", name: "Country", dataType: DataType.String, fieldType: FieldType.Characteristic },
                            { id: "bounty", name: "Bounty", dataType: DataType.Number, fieldType: FieldType.Metric },
                            { id: "lastSeen", name: "Last seen", dataType: DataType.String, fieldType: FieldType.Metric },
                            { id: "terminated", name: "Terminated", dataType: DataType.Boolean, fieldType: FieldType.Metric },
                        ]
                    },
                    values: this.targetsTable
                },
            }
        }
    }

    constructor() {
        this.store = createStore(this.appReducer.bind(this));
    }

    public getStore(): Store {
        return this.store;
    }

    private appReducer(state: Partial<TestDbState> = this.initialState, action: TestDbActions): TestDbState {
        return {
            variables: variableReducers(state.variables, action as VariableActions),
            tables: tableReducers(state.tables, action as TableActions)
        }
    }
}
