import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
function Presentation() {
  const classes = useStyles();
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="Blog title" variant="outlined" />
      </form>
    </div>
  );
}

export default Presentation;
