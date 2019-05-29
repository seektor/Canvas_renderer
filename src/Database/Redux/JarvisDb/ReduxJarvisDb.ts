import { createStore, Store } from 'redux';
import { TestDbActions } from './actions';
import { tableReducers } from "./reducers/tableReducers";
import { variableReducers } from "./reducers/variableReducers";
import { DataType, FieldType, TargetsTableRow, TestDbState } from './types/DataTypes';
import { TableActions } from './types/TableActionsTypes';
import { VariableActions } from './types/VariableActionsTypes';

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
                        rowCount: 1001,
                        fields: [
                            { id: "id", name: "Id", dataType: DataType.Number, fieldType: FieldType.Id },
                            { id: "isActive", name: "Is Active", dataType: DataType.Boolean, fieldType: FieldType.Metric },
                            { id: "bounty", name: "Bounty", dataType: DataType.String, fieldType: FieldType.Metric },
                            { id: "name", name: "First Name", dataType: DataType.String, fieldType: FieldType.Characteristic },
                            { id: "age", name: "Age", dataType: DataType.Number, fieldType: FieldType.Metric },
                            { id: "gender", name: "Gender", dataType: DataType.String, fieldType: FieldType.Characteristic },
                            { id: "address", name: "Address", dataType: DataType.String, fieldType: FieldType.Metric },
                            { id: "latitude", name: "Latitude", dataType: DataType.Number, fieldType: FieldType.Metric },
                            { id: "longitude", name: "Longitude", dataType: DataType.Number, fieldType: FieldType.Metric },
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
