import React, { useState } from "react";
import { useStyles } from "./styles/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Button, Avatar } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { IconButton, Paper } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShareIcon from "@material-ui/icons/Share";
import axios from "axios";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ThumbDownAltTwoToneIcon from "@material-ui/icons/ThumbDownAltTwoTone";
import ReadMore from "../ReadMore"
import {Link,Redirect} from "react-router-dom"
function CardData({ item }) {
  // ("data", item);
  let { likes } = item;
  const classes = useStyles();

  const [click, setClick] = useState(false);

  const [follow, setFollow] = useState(item.follow);

  const incrementLikesForBlog = {
    likes: likes + 1,
  };
  
  const DecrementLikesForBlog = {
    likes: likes--,
  };
  const likeBlog = () => {
    setClick((bool) => !bool);
    if (click) {
      axios
        .put(`/updateBlog?email=${item.email}`, incrementLikesForBlog)
        .then((likes) => {
          
        })
        .catch((error) => {
         
        });
    }
  };
  const disLikeBlog = () => {
    setClick((bool) => !bool);
    if (!click) {
      axios
        .put(`/updateBlog?email=${item.email}`, DecrementLikesForBlog)
        .then((disLikes) => {
        
        });
    }
  };

  //read More
  const readMore = () => {
    axios
      .get(`/getSingleBlogById?_id=${item._id}`)
      .then((res) => {
        const blog=res.data.blog
     
        ("res🚀", res.data.blog);
        <ReadMore blog={blog}/>
      })
      .catch((error) => {
       
      });
  };

  const handleClick = (e) => {
    setFollow((bool) => !bool);
  };
 

  const title = item.title;

  return (
    <div>
      <Paper elevation={11}>
        <Card className={classes.root} variant="outlined">
          {/* <Avatar alt="Cindy Baker" style={{size:"small",marginLeft:"auto",marginRight:"auto",marginTop:"auto",marginBottom:"auto"}}/> */}
          <CardContent>
            {title.startsWith("js") ? (
              <Typography
                style={{ color: "#ffe030" }}
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                {item.title}
              </Typography>
            ) : (
              <Typography
                className={classes.title}
                color="textPrimary"
                gutterBottom
              >
                {item.title}
              </Typography>
            )}

            <Typography className={classes.pos} color="textSecondary">
              Name:{item.userFullName}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {item.email}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {item.publishedOn}
            </Typography>
            <Typography
              className={classes.blogsContent}
              variant="h5"
              component="h4"
              style={{
                color: "grey",
                lineHeight: "2.5em",
                height: "3em",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: "100%",
              }}
            >
              {item.content}
            </Typography>
          </CardContent>
          <CardActions>
           <Link to={`/readMore/${item._id}`} style={{textDecoration: 'none',}}> <Button
            onClick={readMore}
              style={{
                color: "white",
                marginTop: "-30px",
                backgroundColor: "#3b5998",
                textDecoration: 'none',
                fontWeight:800
              }}
              size="small"
              variant="contained"
            >
              Read More
            </Button></Link>
            {click ? (
              <IconButton
                style={{ color: "#3b5998", marginTop: "-30px" }}
                onClick={likeBlog}
              >
                <ThumbDownAltTwoToneIcon />
                {item.likes}
              </IconButton>
            ) : (
              <IconButton style={{ marginTop: "-30px" }} onClick={disLikeBlog}>
                <ThumbUpAltIcon />
                {item.likes}
              </IconButton>
            )}

            {follow ? (
              <IconButton
                style={{ color: "red", marginTop: "-30px" }}
                onClick={handleClick}
              >
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton style={{ marginTop: "-30px" }} onClick={handleClick}>
                <FavoriteBorderIcon />
              </IconButton>
            )}
            <IconButton style={{ marginTop: "-30px" }}>
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Paper>
    </div>
  );
}

export default CardData;
