import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {
  Paper,
  CardActions,
  Card,
  CardContent,
  Typography,
  IconButton,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  Box,
  DialogTitle,
  Dialog,
  TextareaAutosize,
  BottomNavigation,
} from "@material-ui/core";
import { useStyles, StyledBreadcrumb } from "../styles/contentDisplayStyles";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import Footer from "../Footer";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import  BreadcrumbsPage from "../../../tools/breadCrumbs"  
function Presentation({ blog}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Paper
        style={{
          marginTop: "0px",
          marginBottom:"10px",
          backgroundColor: "lightgray",
          height: "50px",
          position: "sticky",
        }}
      >
        <h1
          style={{
            text: "bold",
            marginTop: "0px",
            backgroundColor: "",
            textAlign: "center",
          }}
        >
          ReactJS
        </h1>
        {/* <Avatar style={{top:"25px",backgroundColor:"skyblue",marginLeft:"10px",position:"center"}}>P</Avatar> */}
      </Paper>

          {/* BreadCrumbs implementation*/}
      {/* <Breadcrumbs
        style={{width: "100px", position: "relative", display: "inline" }}
        aria-label="breadcrumb"
      >
        <StyledBreadcrumb component="a" href="/" label="Home" />
        <StyledBreadcrumb label="ReadMore" disabled={true}/>
        <StyledBreadcrumb component="a" href="/user/Profile" label="User-Profile" />
        
      </Breadcrumbs> */}
      <BreadcrumbsPage/>

      <Paper
        style={{
          marginTop:"15px",
          borderRadius: "30px",
          position: "fixed",
          border: "1px solid black",
          height: "100%",
          width: "100%",
          // backgroundColor:"red"
        }}
        elevation={10}
      >
        <Avatar
          style={{
            marginLeft: "10px",
            marginTop: "10px",
            border: "2px solid black",
            color: "white",
            backgroundColor: "orange",
          }}
        >
          PK
        </Avatar>
        <br />
        <h3 style={{ marginLeft: "10px", display: "inline", color: "#424d45" }}>
          Published By :{" "}
        </h3>
        <h2 style={{ marginLeft: "10px", display: "inline" }}>
          Praveen kusuluri
        </h2>
        <br />
        <br />
        <h3 style={{ marginLeft: "10px", display: "inline", color: "#424d45" }}>
          Email Address:
        </h3>
        <h2 style={{ marginLeft: "10px", display: "inline" }}>
          Praveenkusuluri08@gmail.com
        </h2>
        <br />
        <br />
        <h3 style={{ marginLeft: "10px", display: "inline", color: "#424d45" }}>
          Published On:
        </h3>
        <h2 style={{ display: "inline" }}>
          {" "}
          Friday, September 3, 2021 10:09 AM
        </h2>
        <hr />
        <h3 style={{ color: "#424d45" }}>Content :</h3>
        <Card className={classes.root}>
          <CardContent style={{ color: "#1b2625", size: "10px" }}>
            {/* TODO:Important points of the blog=> like Trilar */}
            <Typography
              className={classes.title}
              color="textPrimary"
              gutterBottom
            >
              Word of the Day
            </Typography>

            <Typography className={classes.pos} color="textSecondary">
              adjective
            </Typography>
            <Typography variant="body2" component="p">
              well meaning and kindly.
              <br />
              {'   "a benevolent smile"'}
            </Typography>
            <p> </p>
            {/* TODO:Paragraph 2 */}
            <Typography style={{ fontSize: "18px" }}>
              This works multiple ways: if you try to render a line break in JSX
              through a variable, it will "safely" render the markup instead of
              adding the line break. Using escape characters with this CSS works
              around that safety mechanism as well as fixing the stated issue
            </Typography>
            {/* TODO:Paragraph 3 */}

            {/* TODO:Paragraph 4 */}
          </CardContent>
          <hr />

          <CardActions>
            <br />

            <IconButton>
              <FavoriteIcon />
            </IconButton>

            <IconButton>
              <ShareIcon />
            </IconButton>

            <IconButton style={{}} onClick={handleClickOpen}>
              <CommentIcon />
            </IconButton>

            <IconButton>
              <SendIcon />
            </IconButton>

            <Dialog
              open={open}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Use Google's location service?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Please Comment about the blog by that we can improve the
                  content of the blog.
                </DialogContentText>
                <TextareaAutosize
                  style={{ width: "100%" }}
                  aria-label="Comment"
                  minRows={3}
                  placeholder="Comment"
                />
              </DialogContent>
              <DialogActions>
                <Button
                  style={{ width: "100%", fontSize: "15px" }}
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  Comment
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>

          <List
            style={{
              // marginLeft: "10px",
              // marginTop: "10px",
              border: "2px solid black",
              color: "white",
              backgroundColor: "orange",
              position: "absolute",
              right: "10px",
              bottom: "50px",
              width: "100%",
              left: "0",
              height: "100px",
            }}
          ></List>
        </Card>
      </Paper>
    </div>
  );
}

export default Presentation;
