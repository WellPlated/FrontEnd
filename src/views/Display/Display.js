import React from "react";
// @material-ui components
import Grid from "@material-ui/core/Grid";
import "../../css/Display.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Display(props) {
  //Retrieve hash from URL
  const hash = window.location.pathname.slice(-6);

  //Setup comments
  const [Comments, setComments] = useState([]);

  //Setup unique image URL
  const [imageURL, setImageURL] = useState("");

  //Confirmation message
  const [Confirmation, setConfirmation] = useState("");

  //If query exists, we can use that info, otherwise leave it for the getter function
  const [Recipe, setRecipe] = useState(
    props.location.query ? JSON.parse(props.location.query.info) : undefined
  );

  //Setup tags
  const [RecipeTags, setRecipeTags] = useState([]);

  //Get unique image through API call
  const getImage = (name) => {
    const food = encodeURIComponent(name);
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

  useEffect(async () => {
    // fetch comments
    async function getComments() {
      axios
        .post("http://127.0.0.1:5000/getcomments", {
          hashnum: hash,
        })
        .then(function (response) {
          console.log(response);
          console.log("Printing comments");
          console.log(response["data"]["comments"]);
          setComments(response["data"]["comments"]);
          console.log(Comments);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    //fetch tags
    const getTags = (id) => {
    const identifier = encodeURIComponent(id);
    axios
      .get("http://127.0.0.1:5000/recipes/gettags?recipe_id=" + identifier)
      .then((response) => {
        if (response["data"]["status"] === 200) {
          // console.log("tags: ");
          setRecipeTags(response.data.tags);
        } else if (response["data"]["status"] === 403) {
          alert("Failed to fetch tags data");
        }
      })
      .catch((error) => {
        console.log(error);
        //Perform action based on error
      });
  }

    /*
    * Fetch recipe from database
    * Used to allow shareable links
    * Fetch recipe image
    * Fetch recipe tags
    */
    function getRecipe() {
      axios
        .get("http://127.0.0.1:5000/recipes/fetch_recipe?hash=" + hash)
        .then((response) => {
          console.log(response);
          setRecipe(response["data"][0]);
          getImage(response["data"][0].title);
          getTags(response["data"][0].id);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    //Retrieve recipe from database if query is non-existent
    if (!Recipe) {
      getRecipe();
    }

    //Once recipe is loaded, retrieve its comments
    if (Recipe) {
      getComments();
    }
  }, []);

  const comment = React.useRef(null);
  let tags = [];

  //Capitalize and separate tags with commas (formatting)
  if (RecipeTags.length > 0){
    for (var i = 0; i < RecipeTags.length; i++){
      tags += (RecipeTags[i].charAt(0).toUpperCase() + RecipeTags[i].slice(1));
      if (i != RecipeTags.length - 1){
        tags += ", ";
      } 
    }
  }

  //submit comment to database
  const handleSubmit = (e) => {
    console.log("Comment added: " + comment.current.value);
    e.preventDefault();
    axios
      .post("http://127.0.0.1:5000/comment", {
        comment: comment.current.value,
        hashnum: hash,
      })
      .then(function (response) {
        console.log(response);
        setConfirmation("Added comment!");
        setComments([...Comments, comment.current.value]);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //In case, recipe not found (bad hash, recipe doesn't exist)
  if (Recipe === undefined) {
    return <div className="display-header">No such recipe found!</div>;
  }
  
  //Main display
  return (
    <div className="display-main">
      <header className="display-header">
        <div className="recipeHeader">
          <h2>~{Recipe.title}~</h2>
        </div>
      </header>

      <header className="display-content-background">
        <header className="display-content">
          <Grid className="recipeGrid" container direction="column" spacing={3}>
            <Grid container direction="row" spacing={10}>
              <Grid item xs={12} md={6}>
                <img className="image" src={imageURL} />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid
                  container
                  direction="column"
                  justify="space-between"
                  spacing={5}
                >
                  {/* Displays all the information about the recipe */}
                  <Grid item xs={9}>
                    <div className="recipeInfo">
                      <b>Chef: </b> {Recipe.user}
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <div className="recipeInfo">
                      <b>Date Uploaded: </b> {Recipe.date}
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <div className="recipeInfo">
                      <b>Cuisine: </b> {Recipe.cuisine}
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <div className="recipeInfo">
                      <b>Description:</b> {Recipe.description}
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <div className="recipeInfo">
                      <b>Ingredients:</b> {Recipe.ingredients}
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <div className="recipeInfo">
                      <b>Recipe:</b> {Recipe.recipe}
                    </div>
                  </Grid>
                  <Grid item xs={9}>
                    <div className="recipeInfo">
                      <b>Tags:</b> {tags}
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={9}>
              <div>
                <b>Comments</b>
              </div>
              <textarea
                rows={4}
                cols={100}
                placeholder="Leave your own comment!"
                ref={comment}
              ></textarea>
            </Grid>
            <Grid item xs={9}>
              <a
                onClick={handleSubmit}
                type="submit"
                className="submit-comment-button"
              >
                Post!
              </a>
              
            </Grid>
          </Grid>
          <ul>
            {
              // display comments
              Comments === undefined ? (
                <div></div>
              ) : (
                Comments.map((comment) => <li key={comment}>{comment}</li>)
              )
            }
          </ul>
        </header>
      </header>
    </div>
  );
}
