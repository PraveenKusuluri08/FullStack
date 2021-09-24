import React from "react";
import {useStyles} from "../styles/contentDisplayStyles"
function Presentation() {
    const classes = useStyles()
  return (
    <div>
      <footer className={classes.footer}>
        <p>Some footer nonsense!</p>
      </footer>
    </div>
  );
}

export default Presentation;
