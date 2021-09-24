import {combineReducers} from "redux"
import {reducers as signUpReducers} from "./authReducers"
import {reducers as signInReducers} from "./signInReducer"

export const authSignUp = combineReducers({
    signUpReducerData :signUpReducers,
})

export const authSignIn= combineReducers({
    signInReducer :signInReducers
})