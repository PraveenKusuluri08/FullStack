import {initialState} from "./initialState";
import ACTIONS from "../actions/actionTypes";
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.READ_DATA_REQUEST:
      return {
        ...state,
        statusText: "ideal",
        error: false,
      };
    case ACTIONS.READ_DATA_SUCEESS:
      return {
        ...state,
        statusText: action.payload.statusText,
        allBlogs: action.payload.data,
        error: false,
        ok: true,
      };
    case ACTIONS.READ_DATA_FAILURE:
      return {
        statusText: action.payload.statusText,
        allBlogs: action.payload,
        error: true,
        ok: false,
      };
      default:
          return state
  }
};
