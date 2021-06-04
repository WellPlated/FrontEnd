import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from "@material-ui/core/Chip"
import axios from 'axios';

// styling overrides
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  // styling for horizontal scrolling tag badges
  tags: {
    display: "flex",
    overflow: "auto",
    flexWrap: "nowrap",
    width: "55%",
    height: "30px",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  tag: {
    margin: theme.spacing(0.5),
  },
}));

export default function Recipe(props) {
  // use classes to store styling names
  const classes = useStyles();

  // state variable to hold tags array (useState hook)
  const [tags, setTags] = useState([]);

  // state variable to track whether recipe is liked/not
  const [liked, setLiked] = useState(props.liked);

  // state variable to hold recipe id #
  const [ID, setID] = useState(props.id);

  // state variable to hold image URL
  const [imageURL, setImageURL] = useState();

  /* 
  useEffect hook manages component lifecycle and rerenders.
  props.liked and props.id are dependencies that trigger rererenders
  when updated.
  */
  useEffect(() => {
    // backend API calls
    retrieveTags(props.recipe_id);
    setLiked(props.liked);
    setID(props.id);
    getImage();
  }, [props.liked, props.id]);

  // delete a recipe from database
  const deleteRecipe = (id, refresh) => {
    console.log("Will delete the recipe with this description: " + id);
    axios.post("http://127.0.0.1:5000/delete", {
        id: id
    })
    .then ((response) => {
      // refresh the profile page
      refresh()
      console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });
  }

  // like/unlike a recipe based on current state of liked state variable
  const likeRecipe = (id, token) => {
    if (token === null) {
      alert("Please Log In or Sign Up to Like Recipes");
      return;
    }
    console.log("Will like this recipe: " + id);
    axios
      .post(("http://127.0.0.1:5000/" + (liked ? "unlike" : "like")), {
        recipe_id : id,
        token : token
      })
      .then((response) => {
        if (response.data.status === "success") {
          setLiked(!liked);
        } else {
          alert("Couldn't " + (liked ? "unlike" : "like") + " recipe");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // get the tags associated with this recipe in the form of an array
  const retrieveTags = (recipe_id) => {
    console.log("Getting tags for recipe with id: " + recipe_id);
    axios
      .get("http://127.0.0.1:5000/recipes/gettags?recipe_id=" + recipe_id)
      .then((response) => {
        if (response["data"]["status"] === 200) {
          setTags(response.data.tags);
        } else if (response["data"]["status"] === 403) {
          alert("Failed to fetch tags data");
        }
      })
      .catch((error) => {
        console.log(error);
        //Perform action based on error
      });
  };

  // get the image associated with this recipe
  const getImage = () => {
    const food = encodeURIComponent(props.title);
    axios
      .get("http://127.0.0.1:5000/getImage?name=" + food)
      .then((response) => {
        setImageURL(response.data.url);
        console.log("image url:" + imageURL);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      {/* Material UI card component */}
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.user_id}
            </Avatar>
          }
          action={
            // display delete button depending on props (page on which it's displayed)
            props.deletable ? (
              <IconButton
                aria-label="trash"
                onClick={() => deleteRecipe(props.id, props.refresh)}
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <></>
            )
          }
          title={props.title}
          subheader={props.date}
        />
        <CardMedia
          className={classes.media}
          image={imageURL}
          title={props.description}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {/* Like button, call likeRecipe function */}
          <IconButton
            color={liked ? "secondary" : "default"}
            aria-label="add to liked recipes"
            onClick={() => likeRecipe(ID, localStorage.getItem("token"))}
          >
            <FavoriteIcon />
          </IconButton>
          <Button
            size="small"
            color="primary"
            href={"/Display/$" + props.hash}
          >
            View Recipe
          </Button>
          <div className={classes.tags}>
            {// map the tags to "Chips" on card bottom
            tags.map((tag) => (
              <Chip
                className={classes.tag}
                variant="default"
                size="small"
                label={tag}
              />
            ))}
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

// define expected prop data types
Recipe.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  ingredients: PropTypes.string,
  name: PropTypes.string,
  recipe: PropTypes.string,
  user_id: PropTypes.number
};