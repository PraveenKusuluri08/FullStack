import axios from "axios";
import {
  createRequest,
  createSuccess,
  createFailure,
} from "../actions/actionCreators";
export const createData = (payload) => {
  return (dispatch, getState) => {
    dispatch(createRequest());
    axios
      .post(`/createBlog`, payload)
      .then((data) => {
        dispatch(createSuccess(data));
      })
      .catch((error) => {
        dispatch(createFailure(error));
      });
  };
};
