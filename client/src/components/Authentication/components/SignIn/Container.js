import React, { useState } from "react";
import Presentation from "./Presentation";
import { connect, useDispatch } from "react-redux";
import { signIn } from "../../middleWare/index";
import { authenticate, isAuthenticated } from "../cutoms/middleware";
import { Redirect } from "react-router";
function Container(props) {
  const { signInData } = props;
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const emailAndPassword = {
    email: state.email,
    password: state.password,
  };
  console.log("authe", isAuthenticated());

  const token = signInData.data.token;

  const handleSignIn = (e) => {
    e.preventDefault();
    props._signIn(emailAndPassword);
    state.email=""
    state.password=""
    //TODO:Saving info into the localstorage
  }
  
  authenticate(signInData.data, () => {
    return signInData.redirectPage;
  });


  const handleRedirect = () => {
    const { user } = signInData.data;
    if (signInData.redirectPage) {
      if (user && user.role === 1) {
         console.log("Redirected to admin page");
      } else {
        console.log("Redirected to user page");
      }
    }
    if (isAuthenticated()!==false) {
      return <Redirect to="/" />;
    }else{
      return <Redirect to="/user/signIn" />
    }
  };
    
  return (
    <div>
      <Presentation
        fetchTokenFromLocalStorage={token}
        handleSignIn={handleSignIn}
        state={state}
        setState={setState}
      />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    signInData: state.signInReducer.signInReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    _signIn: (data) => dispatch(signIn(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Container);
