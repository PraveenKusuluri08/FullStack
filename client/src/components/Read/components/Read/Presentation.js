import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import CardData from "../ReadDashBoardCardsUI/CardData";
import { Grid, Paper } from "@material-ui/core";
function Presentations(props) {
  const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });
  const { allBlogsData } = props;
  const classes = useStyles();

  if (allBlogsData !== undefined) {
    var data = allBlogsData.data;
  }
  return (
    <div>
      <div className={classes.root}></div>
     
        <Grid
          container
          spacing={1}
          className={classes.gridContainer}
          justify="center"
        >
          {data&&data.map((item) => {
            // ("item",item)
            return (
              <div style={{ width: "700px", height: "350px" }}>
                <Grid item xs={11}>
                  <CardData item={item} />
                </Grid>
              </div>
            );
          })}
        </Grid>
     
    </div>
  );
}

export default Presentations;
