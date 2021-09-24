import ACTIONS from './actionTypes'

export const readDataRequest=()=>{
    return {
        type:ACTIONS.READ_DATA_REQUEST
    }
}

export const readDataSuccess=(payload)=>{
    return {
        type:ACTIONS.READ_DATA_SUCEESS,
        payload
    }
}

export const readDataFailure=(payload)=>{
    return {
        type:ACTIONS.READ_DATA_FAILURE,
        payload
    }
}