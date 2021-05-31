import React, { useState } from "react";
import { recipes } from "../../jsontest/db.json";
// @material-ui components
import Grid from "@material-ui/core/Grid";
// Components
import Recipe from "./Recipe.js";

export default function RecipeCards(props) {
  return (
    <div className="recipes-container">
      <Grid container>
          {props.recipes.map((data) => {
            return (
              <Grid item xs={12} md={6} lg={3}>
                <Recipe
                  date={data.date}
                  recipe_id={data.id}
                  description={data.description}
                  ingredient={data.ingredients}
                  title={data.title}
                  recipe={data.recipe}
                  tags={data.tags}
                  user={data.user}
                  key={data.hash}
                  deletable={props.deletable}
                />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
};
