import React from 'react';
// @material-ui components
import Grid from "@material-ui/core/Grid";
import Shrimp from "../../img/shrimp-paella.jpg";
import '../../css/Display.css';

// Components

export default function Display(props) {
  let info = undefined;
  const comment = React.useRef(null);
    //console.log(localStorage.getItem("data"));
    const handleSubmit = e => {
    console.log("Comment added: " + comment.current.value);
    e.preventDefault();
    }
  
  //Accessing through direct url, e.g. shared links (no query passed, have to use local storage from Home.js)
  if (!props.location.hasOwnProperty('query')){
    const recipes = JSON.parse(localStorage.getItem("recipes"));
    recipes.forEach(element => {
      if (element.hash === parseInt(props.match.params.hash)){
        info = element;
        return;
      }
    });
  }

  //Accessing through Kitchen Cache/My Profile (query passed)
  else{
    info = JSON.parse(props.location.query.info)
  }

  console.log(info);
  //In case, recipe not found
  if (info === undefined){
    return null;
  }
    //Need to submit comment to database later

    return (
        <div className="display-main">
          <header className="display-header">
            <Grid container direction="row" justify='center' spacing={1}>
              <Grid item xs={1}></Grid>
              <Grid item xs={9}>
                <b className="recipe-name">~{info.title}~</b>
              </Grid>
              <Grid item xs={1}>
              </Grid>
            </Grid>
          </header>
      
          <header className="display-content-background">
            <header className="display-content">
            <Grid container direction="column" justify="space-between" spacing={3}>
              <Grid container direction="row" spacing={9}>
                <Grid item xs={5}>
                    <img  src={Shrimp}></img>
                  </Grid>
                <Grid item xs={5}>
                    <Grid container direction="column" justify="space-between" spacing={5}>
                        <Grid item xs={9}>
                            <div><b>Chef: </b> {info.user}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div><b>Date Uploaded: </b> {info.date}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div><b>Cuisine: </b> {info.cuisine}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div><b>Description:</b> {info.description}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div><b>Ingredients:</b> {info.ingredients}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div><b>Recipe:</b> {info.recipe}</div>
                        </Grid>
                        <Grid item xs={9}>
                            <div><b>Tags:</b> {info.tags}</div>
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
                </Grid>
                </Grid>
               
                {/*~~NEED to display comments after retrieving from database~~*/}

          </header>
          </header> 
        </div>); 
  }  