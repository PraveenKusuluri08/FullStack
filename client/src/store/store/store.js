import {reducer} from "../reducer/index"
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

export const store =  createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
)