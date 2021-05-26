import React, { useState } from "react";
import { recipes } from "../../jsontest/db.json";
// @material-ui components
import Grid from "@material-ui/core/Grid";
// Components
import Recipe from "./Recipe.js";

const clickTest = (data) => {
  console.log(data.tags + " is clicked!");
  window.open("/", "_blank")
}

export default function RecipeCards(props) {
  return (
    <div className="recipes-container">
      <Grid container >
          {props.recipes.map((data) => {
            return (
            <Grid item onClick={() => {
              clickTest(data);
            }} xs={12} md={6} lg={3}>
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
            </Grid>
            );
          })}
      </Grid>
    </div>
  );
};
