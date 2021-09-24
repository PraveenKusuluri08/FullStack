import {combineReducers} from "redux"

import {createReducer} from "./reducers"

export const createCombineReducers =combineReducers({
    create:createReducer
})