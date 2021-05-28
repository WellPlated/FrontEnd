import React from 'react';
// @material-ui components
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Shrimp from "../../img/shrimp-paella.jpg";
import '../../css/Display.css';
// Components



export default function Display(props) {
    console.log(props);
    const {
      params: { index }
    } = props.match;
    //const info = JSON.parse(props.location.query.info)
    //console.log(info);
    const comment = React.useRef(null);
    //console.log(localStorage.getItem("data"));
    const handleSubmit = e => {
    console.log("Comment added: " + comment.current.value);
    e.preventDefault();
    }
    return (<div>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups. Index: {index}</div>);
    /* return (
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
            <Grid container direction="column" justify="left" spacing={3}>
              <Grid container direction="row" spacing={9}>
                <Grid item xs={5}>
                    <img  src={Shrimp}></img>
                  </Grid>
                <Grid item xs={5}>
                    <Grid container direction="column" justify="left" spacing={5}>
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
               
          </header>
          </header> 
        </div>); */
    }