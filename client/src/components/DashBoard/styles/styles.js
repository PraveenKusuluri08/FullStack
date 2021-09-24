import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBarColor: {
    background:
      "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(10,12,23,1) 21%, rgba(0,212,255,1) 100%);",
  },
  menuAvatar:{
    marginTop:"40px",
    position:"static"
  },
  
}));
