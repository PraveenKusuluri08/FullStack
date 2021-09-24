import ACTIONS from "../Actions/actionTypes";
import { initialState } from "./signInState";

export const reducers = (state = initialState, {type,payload}) => {
  switch (type) {
    case ACTIONS.SIGNIN_FAILURE:
      return {
        ...state,
        status: "Processing.......",
        error:payload
      };
    case ACTIONS.SIGNIN_SUCCESS:
      return {
        ...state,
        data: payload,
        isSignedIn: true,
        error: false,
        ok: true,
        status: "SignIn Success",
        redirectPage:true
      };
    case ACTIONS.SIGNUP_FAILURE:
      return {
        ...state,
        error:payload ,
        data: payload,
        status: "SignIn Failure",
        redirectPage :false
      };
    //signOutReducers
    case ACTIONS.SIGNOUT_REQUEST:
      return {
        signOutStatus: "Requesting",
      };
    case ACTIONS.SIGINOUT_SUCCESS:
      return {
        ...state,
       
          signOutStatus:"SignOut success"
        
      };
    case ACTIONS.SIGNOUT_FAILURE:
      return {
        signOutStatus: "Failed to SignOut!! NetWorkIssues😞",
      };
    default:
      return state;
  }
};
