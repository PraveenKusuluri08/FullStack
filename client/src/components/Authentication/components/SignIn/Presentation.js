import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardIcon,
  CardFieldset,
  CardInput,
  CardOptionsItem,
  CardOptions,
  CardOptionsNote,
  CardButton,
  CardLink,
} from "../Layouts/cards";
import {Redirect} from "react-router-dom"
import { Link } from "react-router-dom";
function Presentation(props) {
  // (props);
  const { state, setState,handleSignIn,fetchTokenFromLocalStorage } = props;
  const { email, password } = state;
  // ("object🤖",token)
  return (
    <div>
      {fetchTokenFromLocalStorage?<Redirect to="/"/> : null}
      <CardWrapper>
        <CardHeader>
          <CardHeading>Sign In</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>
            <CardInput
              placeholder="E-mail"
              type="text"
              required
              value={email}
              onChange={(e) => setState({ ...state, email: e.target.value })}
            />
          </CardFieldset>

          <CardFieldset>
            <CardInput
              placeholder="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
            <CardIcon className="fa fa-eye" eye small />
          </CardFieldset>
          <CardFieldset>
            <CardButton onClick={handleSignIn} type="button">Sign In</CardButton>
          </CardFieldset>
          <CardFieldset>
            <Link to="/user/forgotPassword">
              <CardLink>Forgot Password?</CardLink>
            </Link>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
}

export default Presentation;
