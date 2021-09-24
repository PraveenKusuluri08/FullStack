import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { emphasize, withStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  footer:{
    flexShrink: 0,
  textAlign: "center",
  backgrounColor: "tomato",
  color: "black",
  position:"absolute",
  },
});

export const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[900],
    height: theme.spacing(3),
    color: theme.palette.grey[100],
    fontWeight:"800",
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[800],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip);