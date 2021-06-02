import "../../css/Profile.css";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Recipe from "../Components/Recipe";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const name = localStorage.getItem("username"); //Filler for now
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
  },
})); //Modify RecipeCard size for making display better

export default function Profile(props) {
  const [error, setError] = useState("");
  const [myrecipes, setMyRecipes] = useState([]);
  const [liked, setLiked] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(async () => {
    // fetch recipes
    async function getMyRecipes() {
      console.log("Entered getMyRecipes");

      if (!("token" in localStorage)) {
        // can't fetch recipes if a user is not logged in
        return;
      }

      const user_token = localStorage.getItem("token");

      axios
        .post("http://127.0.0.1:5000/recipes/user", {
          token: user_token,
        })
        .then(function (response) {
          if (response["data"]["status"] === 200) {
            setMyRecipes(response["data"]["recipes"]);
            console.log("Got data");
            console.log(myrecipes);
            console.log(myrecipes.length);
          } else if (response["data"]["status"] === 403) {
            setError(response["data"]["message"]);
            console.log("Unable to get my recipes");
          }

          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    getMyRecipes();
    getLikes(localStorage.getItem("token"));
  }, []); // need useEffect so that data isn't fetched after each re-render

    const getLikes = (token) => {
      console.log("Checking liked recipes");
      axios
        .post("http://127.0.0.1:5000/getLikes", {
          token: token,
        })
        .then((response) => {
          setLiked(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    };

  console.log(myrecipes);

  const classes = useStyles();

  if (!("token" in localStorage)) {
    // if user is not logged in
    return (
      <div className="not-logged-in">
        Not logged in! Please log in to view recipes.
      </div>
    );
  } else if (error != "") {
    //display other errors from the backend
    return <div className="not-logged-in">{error}</div>;
  } else if (Object.keys(myrecipes).length === 0) {
    // if DOM renders before data is fetched or if user is not logged in
    return <div className="not-logged-in">No recipes to display.</div>;
  }

  return (
    <div className="Profile">
      <header className="Profile-header">
        <Grid container direction="row" justify="center" spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={9}>
            <b className="headerPage">{name}</b>
          </Grid>
          <Grid item xs={1}>
            <Avatar></Avatar>
          </Grid>
        </Grid>
      </header>
      <div> {error} </div>
      <header className="Profile-content-background">
        <header className="Profile-content">
          <Grid container direction="row" spacing={1}>
            <Grid item xs={5}>
              <div className="headerProfilePage">My Recipes</div>
              <Grid container direction="row" justify="center" spacing={1}>
                {
                  // map each recipe to a recipe card
                  myrecipes.map((recipe) => (
                    <Grid item xs={5} md={3} className={classes.root}>
                      <Link
                        to={{
                          pathname: `/Display/${recipe.hash}`,
                          query: {
                            info: JSON.stringify(recipe),
                          },
                        }}
                      >
                        <Recipe
                          date={recipe.date}
                          title={recipe.title}
                          description={recipe.description}
                          id={recipe.id}
                          refresh={() => setRefresh(!refresh)}
                          deletable={true}
                        />
                      </Link>
                    </Grid>
                  ))
                }
              </Grid>
            </Grid>

            <Divider
              orientation="vertical"
              justify="center"
              class="Profile-divider"
              flexItem
            />

            <Grid item xs={5}>
              <div className="headerProfilePage">Liked Recipes</div>
              <Grid container direction="row" justify="center" spacing={1}>
                <Grid item xs={5} md={3} className={classes.root}>
                  {liked.map((recipe) => (
                    <Grid item xs={5} md={3} className={classes.root}>
                      <Link
                        to={{
                          pathname: `/Display/${recipe.hash}`,
                          query: {
                            info: JSON.stringify(recipe),
                          },
                        }}
                      >
                        <Recipe
                          date={recipe.date}
                          title={recipe.title}
                          description={recipe.description}
                          id={recipe.id}
                          refresh={() => setRefresh(!refresh)}
                          deletable={false}
                          liked={true}
                        />
                      </Link>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </header>
      </header>
    </div>
  );
}
