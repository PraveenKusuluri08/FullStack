import {ACTIONS} from "./actionTypes"

export const updateReqest=()=>{
    return{
        type:ACTIONS.UPDATE_REQUEST
    }
}

export const updateSuccess=(payload)=>{
    return{
        type:ACTIONS.UPDATE_SUCCESS,
        payload
    }
}

export const updateFailure=(payload)=>{
    return{
        type:ACTIONS.UPDATE_FAILURE,
        payload
    }
}