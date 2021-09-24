import ACTIONS from "./actionTypes";

//action creators for SignUp
export const signUpRequest = () => {
  return {
    type: ACTIONS.SIGNUP_REQUEST,
  };
};

export const signUpSuccess = (payload) => {
  return {
    type: ACTIONS.SIGNUP_SUCCESS,
    payload,
  };
};

////action creators for SignIN
export const signUpFailure = (payload) => {
  return {
    type: ACTIONS.SIGNUP_FAILURE,
    payload,
  };
};

export const signInRequest = () => {
  return {
    type: ACTIONS.SIGNIN_REQUEST,
  };
};

export const signInSuccess = (data) => {
  return {
    type: ACTIONS.SIGNIN_SUCCESS,
    payload: data.data,
  };
};

export const signInFailure = (payload) => {
  return {
    type: ACTIONS.SIGNIN_FAILURE,
    payload,
  };
};

//action creators for SignOut

export const signOutRequest = () => {
  return {
    type: ACTIONS.SIGNOUT_REQUEST,
  };
};

export const signOutSuccess = () => {
  return {
    type: ACTIONS.SIGINOUT_SUCCESS,
  };
};

export const signOutFailure = () => {
  return {
    type: ACTIONS.SIGNOUT_FAILURE,
  };
};
