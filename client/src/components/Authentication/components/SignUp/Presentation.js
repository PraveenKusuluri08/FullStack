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
import { Link } from "react-router-dom";
function Presentation(props) {
  const { state, setState,handleClick } = props;
  const { email, userFullName, password } = state;
  return (
    <div>
      <CardWrapper>
        <CardHeader>
          <CardHeading>Sign Up</CardHeading>
        </CardHeader>

        <CardBody>
          <CardFieldset>
            <CardInput
              placeholder="Username"
              type="text"
              required
              value={userFullName}
              onChange={(e) =>
                setState({ ...state, userFullName: e.target.value })
              }
            />
          </CardFieldset>

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
            <CardButton type="button" onClick={handleClick}>Sign Up</CardButton>
          </CardFieldset>

          {/* TODO: Login page linking here */}
          <CardFieldset>
            <Link to="/user/signIn">
              <CardLink>I already have an account</CardLink>
            </Link>
          </CardFieldset>
        </CardBody>
      </CardWrapper>
    </div>
  );
}

export default Presentation;
