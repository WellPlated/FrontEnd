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
import ShareIcon from '@material-ui/icons/Share';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Chip from "@material-ui/core/Chip"
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {

    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  tags: {
    overflow: "auto",
    flexWrap: "nowrap",
    width: "55%",
    height: "30px",
  },
  tag: {
    margin: theme.spacing(0.5)
  },
}));

export default function Recipe(props) {
  const classes = useStyles();
  const [tags, setTags] = useState([]);
  const [liked, setLiked] = useState(props.liked);
  const [ID, setID] = useState(props.id);
  const [imageURL, setImageURL] = useState();
  const rest = {...props};

  useEffect(() => {
    retrieveTags(props.recipe_id);
    setLiked(props.liked);
    setID(props.id);

    if (!("token" in localStorage)) {
      // can't fetch recipes if a user is not logged in
      const user_token = null;
    } else {
      const user_token = localStorage.getItem("token");
    }

    getImage();
  }, [props.liked, props.id]); 
  // empty array acts as componentDidMount (runs once)

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

  const retrieveTags = (recipe_id) => {
    console.log("Getting tags for recipe with id: " + recipe_id);
    axios
      .get("http://127.0.0.1:5000/recipes/gettags?recipe_id=" + recipe_id)
      .then((response) => {
        if (response["data"]["status"] === 200) {
          // console.log("tags: ");
          // console.log(response);
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
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.user_id}
            </Avatar>
          }
          action={
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
            {tags.map((tag) => (
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

Recipe.propTypes = {
  date: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.number,
  ingredients: PropTypes.string,
  name: PropTypes.string,
  recipe: PropTypes.string,
  user_id: PropTypes.number
};