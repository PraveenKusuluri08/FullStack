import React, { useState,useEffect } from "react";
import { signUp } from "../../middleWare";
import Presentation from "./Presentation";
import { connect } from "react-redux";
function Container(props) {
  const [state, setState] = useState({
    userFullName: "",
    email: "",
    password: "",
  });
  const {_signUp,signUpToAccount} = props;

  const handleClick=()=>{
      _signUp(state)

  }

//   (signUpToAccount)
  return (
    <div>
      <Presentation state={state} setState={setState} handleClick={handleClick} />
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    signUpToAccount: state.signUpToAccount.signUpReducerData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    _signUp: (data) => dispatch(signUp(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
