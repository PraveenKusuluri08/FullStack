import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Typography,
} from "@material-ui/core";
import MuiLink from "@material-ui/core/Link";
import { withRouter } from "react-router-dom";

const Breadcrumbs = (props) => {
  const {
    history,
    location: { pathname },
  } = props;
  const pathNames = pathname.split("/").filter((x) => x);
  
  return (

    <MUIBreadcrumbs aria-label="breadcrumb">
      {pathNames.length > 0 ? (
        <Link onClick={() => history.push("/")} style={{marginLeft:"30px"}}>Home 🏠</Link>
      ) : (
        <Typography> Home </Typography>
      )}
      {pathNames.map((name, index) => {
        const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
        
        const isLast = index === pathNames.length - 1;

        
        return isLast ? (
          <Link href="/user/profile" key={name}>User Profile</Link>
        ) : pathNames[0] ? (
          <Link disabled key={name} onClick={() => history.push(routeTo)}>
            {name}
          </Link>
        ) : (
          <Link key={name} onClick={() => history.push(routeTo)}>
            {name}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default withRouter(Breadcrumbs);

const Link = withStyles({
  root: {
    "&[disabled]": {
      color: "grey",
      cursor: "default",
      display: "none",
      "&:hover": {
        textDecoration: "none"
      },
      marginLeft: "0px",
    }
  }
})(MuiLink);