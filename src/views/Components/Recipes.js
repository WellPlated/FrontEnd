import React, { useState } from "react";
import { recipes } from "../../jsontest/db.json";
// @material-ui components
import Grid from "@material-ui/core/Grid";
// Components
import Recipe from "./Recipe.js";
import Filters from "./Filters.js";

export default function Recipes() {
  const [filters, setFilters] = useState([]);

  const handleFilters = (filters) => {
    console.log(filters);
    const newFilters = {...filters};


  }

  return (
    <div className="recipes-container">
      <Grid container>
        <Grid container item xs={3}>
          <Filters 
            handleFilters={filters => handleFilters(filters)}
          />
        </Grid>
        <Grid container item xs={9}>
          {recipes.map((data) => {
            return (
            <Grid item xs={12} md={6} lg={3}>
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
            </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};
