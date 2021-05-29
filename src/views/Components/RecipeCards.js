import React, { useState } from "react";
import { recipes } from "../../jsontest/db.json";
// @material-ui components
import Grid from "@material-ui/core/Grid";
// Components
import Recipe from "./Recipe.js";
import { Link } from 'react-router-dom';

export default function RecipeCards(props) {
  
  return (
    <div className="recipes-container">
        <Grid container zeroMinWidth alignItems="center">
          {props.recipes.map((data) => {
            return (
            <Grid item xs={12} md={6} lg={3} >
              <Link to={{
                pathname: `/Display/${data.hash}`, //put data.randnum here to use as url instead of index, no need for index in map either, will change Display once randnum works
                query: {
                  info: JSON.stringify(data)
                }
              }}>
              <Recipe
                date={data.date}
                id={data.id}
                description={data.description}
                ingredient={data.ingredients}
                name={data.name}
                recipe={data.recipe}
                tags={data.tags}
                user={data.user}
              />
              </Link>
            </Grid>
            
            );
          })}
      </Grid>
    </div>
  );
};
