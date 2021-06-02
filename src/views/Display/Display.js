import React from 'react';
// @material-ui components
import Grid from "@material-ui/core/Grid";
import '../../css/Display.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Display(props) {
  const hash = (window.location.pathname).slice(-6);
  const [Comments, setComments] = useState([]);
  const [Confirmation, setConfirmation] = useState("");
  //If query exists, we can use that info, otherwise leave it for the getter function
  const [Recipe, setRecipe] = useState(props.location.query ? JSON.parse(props.location.query.info) : undefined);


  useEffect (async () => {
    // fetch comments
    async function getComments() {
      axios.post('http://127.0.0.1:5000/getcomments', { 
        hashnum : hash,
      })
      .then(function(response) {
        console.log(response);
        console.log("Printing comments")
        console.log(response["data"]["comments"]);
        setComments(response["data"]["comments"]);
        console.log(Comments);
      })
      .catch(function(error) {
        console.log(error);
      });
    }

    //Fetch recipe from database
    //Used to allow shareable links
    function getRecipe() {
      axios.get('http://127.0.0.1:5000/recipes/fetch_recipe?hash='+ hash)
      .then((response) => {
        console.log(response);
        setRecipe(response['data'][0]);
      })
      .catch(function(error){
        console.log(error);
      });
    }

    //Retrieve recipe from database if query is non-existent
    if (!Recipe){
      getRecipe();
    }

    if (Recipe) {
      getComments();
    }

  }, []);

  console.log(Recipe);
  const comment = React.useRef(null);
     //submit comment to database
    const handleSubmit = e => {
      console.log("Comment added: " + comment.current.value);
      e.preventDefault();
      axios.post('http://127.0.0.1:5000/comment', {
            comment : comment.current.value,
            hashnum : hash,
        })
            .then(function(response){
                console.log(response);
                setConfirmation("Added comment!");
                setComments([...Comments, comment.current.value] )
        })
        .catch(function(error){
            console.log(error);
        });
    }
  
//In case, recipe not found (bad hash, recipe doesn't exist)
if (Recipe === undefined){
  return <div className="display-header">No such recipe found!</div>;
}
   
    let cuisine = Recipe.cuisine;
    console.log("cuisine" + cuisine);
    if (Recipe.cuisine === "Drinks/Bevs"){
      cuisine = "Drinks";
    }else if(Recipe.cuisine === ""){
      cuisine = "American";
    }
    const image = require('../../img/' + cuisine + '.jpg');

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
                    <img className="image" src={image.default}/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container direction="column" justify="space-between" spacing={5}>
                      {/* Displays all the information about the recipe */}
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Chef: </b> {Recipe.user}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Date Uploaded: </b> {Recipe.date}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Cuisine: </b> {Recipe.cuisine}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Description:</b> {Recipe.description}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Ingredients:</b> {Recipe.ingredients}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Recipe:</b> {Recipe.recipe}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Tags:</b> {Recipe.tags}</div>
                        </Grid>
                    </Grid>
                </Grid>
              </Grid>
              <Grid item xs={9}>
                  <div><b>Comments</b></div>
                  <textarea
                    rows={4}
                    cols={100}
                    placeholder="Leave your own comment!"
                    ref={comment}
                  ></textarea>
              </Grid>
              <Grid item xs={9}>
                <button onClick={handleSubmit} type="submit" className="submit-comment-button">Post!</button>
                <div>{Confirmation /* confirms that comment was submitted */}</div>
              </Grid>
            </Grid>
              <ul>
                { // display comments
                  (Comments === undefined) ? <div></div> :
                  (Comments.map( comment => <li key={comment}>{comment}</li>))
                }
              </ul>

          </header>
        </header> 
      </div>); 
  }  