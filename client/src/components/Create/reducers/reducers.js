import ACTIONS from "../actions/actionTypes";

import initialState from "./initialState";

export const createReducer = (state = initialState, actions) => {
  const { type, payload } = actions;
  switch (type) {
    case ACTIONS.CREATE_REQUEST:
      return {
        ...state,
        status: "Requesting.......",
      };
    case ACTIONS.CREATE_SUCCESS:
      return {
        ...state,
        blog: payload,
        status: "OK",
      };
    case ACTIONS.CREATE_FAILURE:
      return {
        ...state,
        status: "Failed to create",
        error:payload,
      };
    default:
      return state;
  }
};
