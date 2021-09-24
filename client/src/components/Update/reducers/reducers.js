import { ACTIONS } from "../actions/actionTypes";
import { initialState } from "./initialState";

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  const { UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAILURE } = action;
  switch (type) {
    case UPDATE_REQUEST:
      return {
        ...state,
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        updatedData: payload,
        isUpdated: true,
        error: false,
      };
    case UPDATE_FAILURE:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};
