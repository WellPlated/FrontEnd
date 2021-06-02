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

    if (info) {
      getComments();
    }

  }, []);


  let info = undefined;
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
  
  //Accessing through direct url, e.g. shared links (no query passed, have to use local storage from Home.js)
  if (!props.location.hasOwnProperty('query')){
    /*
    * If we don't use the Home page link, fetch it from the database
    * set info = to the api call
    */
    
  } 

  //Accessing through Kitchen Cache/My Profile (query passed)
  else{
    info = JSON.parse(props.location.query.info)
  }

  //In case, recipe not found (bad hash, recipe doesn't exist)
  if (info === undefined){
    return <div className="display-header">No such recipe found!</div>;
  }
   
    let cuisine = info.cuisine;
    console.log("cuisine" + cuisine);
    if (info.cuisine === "Drinks/Bevs"){
      cuisine = "Drinks";
    }else if(info.cuisine === ""){
      cuisine = "American";
    }
    const image = require('../../img/' + cuisine + '.jpg');

    return (
      <div className="display-main">
        <header className="display-header">
          
            <div className="recipeHeader">
              <h2>~{info.title}~</h2>
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
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Chef: </b> {info.user}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Date Uploaded: </b> {info.date}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Cuisine: </b> {info.cuisine}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Description:</b> {info.description}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Ingredients:</b> {info.ingredients}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Recipe:</b> {info.recipe}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div className="recipeInfo"><b>Tags:</b> {info.tags}</div>
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