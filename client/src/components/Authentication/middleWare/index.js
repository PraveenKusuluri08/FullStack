import {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
  signOutRequest,
  signOutSuccess,
  signOutFailure,
} from "../Actions/actionCreators";
import axios from "axios";
import { API } from "../../../apiCall/apiCall";

export const signUp = (user) => {
  return (dispatch, getState) => {
    dispatch(signUpRequest());
    // (user);
    const data = {
      userFullName: user.userFullName,
      email: user.email,
      password: user.password,
    };

    axios
      .post("/user", data)
      .then((res) => {
        dispatch(signUpSuccess("Success"));
      })
      .catch((error) => {
        dispatch(signUpFailure("Failure"));
      });
  };
};

export const signIn = (data) => {
  return (dispatch, getState) => {
    dispatch(signInRequest());

    axios
      .post(`${API}/user/signIn`, data)
      .then((res) => {
        console.log("resres", res);
        dispatch(signInSuccess(res));
      })
      .catch((error) => {
        dispatch(signInFailure(error));
      });
  };
};

export const signOut = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    
    return (dispatch, getState) => {
      dispatch(signOutRequest());
      axios
      .get("/user/signout")
      .then(() => {
        dispatch(signOutSuccess());
        console.log("SignOut Success");
      })
      .catch((error) => {
        console.log(error);
        dispatch(signOutFailure());
      });
    };
  }
};

