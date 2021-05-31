import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../css/Home.css';
// @material-ui components
import Grid from "@material-ui/core/Grid";
// Components
import SideNav from "../SideNav/SideNav.js";
import RecipeCards from "../Components/RecipeCards.js";
import FilterBoxes from "../Components/FilterBoxes.js";

export default function Home() {
  const [Recipes, setRecipes] = useState([]);
  const [SearchTerms, setSearchTerms] = useState("");
  const [PostSize, setPostSize] = useState();

  const [Filters, setFilters] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = (variables) => {
    axios.post('http://127.0.0.1:5000/recipes/filter', variables)
            .then(function(response){
                console.log(response);
                setRecipes(response.data);
                if (response['data']['status'] === 200) {
                  setRecipes(response.data);
                }
                else if (response['data']['status'] === 403) {
                  alert("Failed to fetch recipe datas");
                }
        })
        .catch(function(error){
          console.log(error);
          //Perform action based on error
        });
  }

  const handleFilters = (filters) => {
    const newFilters = {...Filters};

    const variables = {
      tags: filters,
    };

    getRecipes(variables);
    setFilters(newFilters);
  }

  return (
    <div className="Home">
      <header className="Home-header">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <h1>Our Kitchen</h1>
          </Grid>
          <Grid container item xs={12} spacing={3} justify="flex-end">
            <Grid item xs={3}>
              <FilterBoxes handleFilters={filters => handleFilters(filters)}/>
            </Grid>
            <Grid item xs={9}>
              {Recipes.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No posts yet...</h2>
                </div> :
                <RecipeCards recipes={Recipes} deletable={false} />
              }
            </Grid>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}


