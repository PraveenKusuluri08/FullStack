import {combineReducers} from "redux"

import {reducer as ReadAllDataReducer} from "./ReadAllDataReducers"

export const combineAllReads = combineReducers({
    readAllData : ReadAllDataReducer,
})