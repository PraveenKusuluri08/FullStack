import ACTIONS from "./actionTypes"

export const createRequest =()=>{
    return{
        type:ACTIONS.CREATE_REQUEST,
    }
}

export const createSuccess=(payload)=>{
    return{
        type:ACTIONS.CREATE_SUCCESS,
        payload
    }
}

export const createFailure=(payload)=>{
    return{
        type:ACTIONS.CREATE_FAILURE,
        payload
    }
}