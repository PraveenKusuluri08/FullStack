import axios from "axios";
import {
  readDataRequest,
  readDataSuccess,
  readDataFailure,
} from "../actions/actionCreators";

export const readAllBlogs =() => {
  return (dispatch, getState) => {
    dispatch(readDataRequest());
     axios.get("/getAllBlogs")
      .then((data) => {
         dispatch(readDataSuccess(data))
      })
      .catch((error) => {
        readDataFailure(error);
      });
  };
};
