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
        <Grid container spacing={2}>
          {props.recipes.map((data) => {
            return (
              <Grid item xs={12} md={6} lg={3} key={data.hash} >
                  <Recipe
                    date={data.date}
                    id={data.id}
                    recipe_id={data.id}
                    hash={data.hash}
                    description={data.description}
                    ingredient={data.ingredients}
                    title={data.title}
                    recipe={data.recipe}
                    tags={data.tags}
                    cuisine={data.cuisine}
                    user={data.user}
                    deletable={props.deletable}
                    liked={props.liked.includes(data.id)}
                  />
                {/* </Link> */}
              </Grid>
            );
          })}
        </Grid>
    </div>
  );
};
