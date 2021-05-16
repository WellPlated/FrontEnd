import "../../css/Profile.css";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import RecipeCard from "../Components/Recipe";
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useState, useEffect } from 'react';

const name = localStorage.getItem("username");//Filler for now
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
  },
}));//Modify RecipeCard size for making display better

function Profile() {

  const [error, setError] = useState("");
  const [myrecipes, setMyRecipes] = useState({});

  useEffect (async () => {

    async function getMyRecipes() {

      console.log("Entered getMyRecipes")

      if (!("token" in localStorage))
      {
        return;
      }

      const user_token = localStorage.getItem("token");

      axios.post('http://127.0.0.1:5000/recipes/user', {
        token: user_token
      })
          .then(function(response){
            if (response['data']['status'] === 200) {
              setMyRecipes(response['data']['recipes'])
              console.log("Got data")
              console.log(myrecipes)
              console.log(myrecipes.length)
            }
            else if (response['data']['status'] === 403) {
              setError("Unable to get my recipes")
              console.log("Unable to get my recipes")
          }
            
              console.log(response);
          })
          .catch(function(error){
            console.log(error);
            //Perform action based on error
          });
    }

    getMyRecipes();

  }, [] ) // need useEffect so that data isn't fetched after each re-render

  console.log(myrecipes)

  const classes = useStyles();

  if (Object.keys(myrecipes).length === 0) // if DOM renders before data is fetched or if user is not logged in
  { return <div className="not-logged-in">You must be logged in to access your recipes</div> }

  return (
    <div className="Profile">
      <header className="Profile-header">
        <Grid container direction="row" justify='center' spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={9}>
            <b className="headerPage">{name}</b>
          </Grid>
          <Grid item xs={1}>
            <Avatar></Avatar>
          </Grid>
        </Grid>
      </header>
  <div> { error } </div> { /* not sure if this line does anything */ }
      <header className="Profile-content-background">
        <header className="Profile-content">

          <Grid container direction="row" spacing={1}>
            <Grid item xs={5}>
              <div className="headerProfilePage">My Recipes</div>
              <Grid container direction="row" justify="center" spacing={1}>
                
                { myrecipes.map( recipe => 
                  <Grid item xs={5} md={3} className={classes.root} ><RecipeCard 
                    date={recipe["date"]} name ={recipe["name"]} description={recipe["description"]}/>
                  </Grid>)
                }
              </Grid>
            </Grid>
        
        <Divider orientation="vertical" justify="center" class="Profile-divider" flexItem/>
        
        <Grid item xs={5}>
          <div className="headerProfilePage">Liked Recipes</div>
          <Grid container direction="row" justify="center" spacing={1}>
            <Grid item xs={5} md={3} className={classes.root} ><RecipeCard 
              date={myrecipes[0]["date"]} name={myrecipes[0]["name"]} description={myrecipes[0]["description"]}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      

      </header>
      </header> 
    </div>);
}

export default Profile;
