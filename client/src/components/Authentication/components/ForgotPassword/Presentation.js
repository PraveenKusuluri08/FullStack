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
  CardButton,
  CardLink,
} from "../Layouts/cards";
import { Link } from "react-router-dom";
function Presentation(props) {
  const { state, setState } = props;
  const { password, conformPassword } = state;
  return (
    <div>
      <CardWrapper>
        <CardHeader>
          <CardHeading>Sign In</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>
            <CardInput
              placeholder="Password"
              type="text"
              required
              value={password}
              onChange={(e) => setState({ ...state, password: e.target.value })}
            />
          </CardFieldset>

          <CardFieldset>
            <CardInput
              placeholder="Conform Password"
              type="password"
              required
              value={conformPassword}
              onChange={(e) =>
                setState({ ...state, conformPassword: e.target.value })
              }
            />
            <CardIcon className="fa fa-eye" eye small />
          </CardFieldset>

          <CardFieldset>
            <CardButton
              disabled={
                !password === conformPassword &&
                password !== "" &&
                conformPassword !== ""
              }
              type="button"
            >
              Forgot Password
            </CardButton>
          </CardFieldset>

          <CardFieldset>
            <Link to="/user/signIn">
              <CardLink style={{ marginLeft: "10px" }}>Cancel Process</CardLink>
            </Link>

            <Link to="/user/signUp">
              <CardLink style={{ marginLeft: "20px" }}>SignUp</CardLink>
            </Link>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
}

export default Presentation;
