import {combineReducers} from "redux"
import {combineAllReads} from "../../components/Read/reducers/index"
import {authSignUp,authSignIn} from "../../components/Authentication/reducers/index"

export const reducer = combineReducers({
    combineAllReads:combineAllReads,
    signUpToAccount:authSignUp,
    signInReducer:authSignIn
})