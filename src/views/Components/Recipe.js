import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
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
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  tags: {
    overflow: "auto",
    flexWrap: "nowrap",
  },
  tag: {
    margin: theme.spacing(0.5)
  },
}));

export default function Recipe(props) {
  const classes = useStyles();
  const [tags, setTags] = useState([]);
  const [liked, setLiked] = useState(false);


  const image = require("../../img/" +
    (props.cuisine === "Drinks/Bevs" ? "Drinks" : props.cuisine) +
    ".jpg");

  useEffect(() => {
    retrieveTags(props.recipe_id);
  }, []); 
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

  const likeRecipe = (id) => {
    console.log("Will like this recipe: " + id);
    axios
      .post("http://127.0.0.1:5000/like", {
        id: id,
      })
      .then((response) => {
        setLiked(!liked);

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
          console.log("tags: ");
          console.log(response);
          setTags(response.data.tags);
        } else if (response["data"]["status"] === 403) {
          alert("Failed to fetch tags data");
        }
      })
      .catch((error) => {
        console.log(error);
        //Perform action based on error
      });
  }

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
          image={image.default}
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
            onClick={() => likeRecipe(props.id)}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
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