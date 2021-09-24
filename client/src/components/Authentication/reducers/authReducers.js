import ACTIONS from "../Actions/actionTypes";
import { initialState } from "./initialState";

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SIGNUP_REQUEST:
      return {
        ...state,
        status:action.payload,
        error: false,
        loading: true,
      };
    case ACTIONS.SIGNUP_SUCCESS:
      return {
        ...state,
        status:action.payload,
        addOn: action.payload,
        loading: false,
      };
    case ACTIONS.SIGNUP_FAILURE:
      return {
        ...state,
        status:action.payload,
        error: true,
        loading: false,
      };
    default:
      return state;
  }
};
