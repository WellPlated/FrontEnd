import React from "react";
import { recipes } from "../../jsontest/db.json";
// @material-ui components
import Grid from "@material-ui/core/Grid";
// Components
import Recipe from "./Recipe.js";

export default function Recipes() {
  return (
    <>
      <div className="recipes-container">
        <Grid>
            <Grid item xs={12} md={6} lg={3}>
                
            </Grid>



        </Grid>


        {recipes.map((data) => {
          return (
            <div key={data.id}>
              <Recipe 
                date={data.date}
                id={data.id}
                description={data.description}
                ingredient={data.ingredients}
                name={data.name}
                recipe={data.recipe}
                tags={data.tags}
                user_id={data.user_id}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};
