import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../../css/Home.css';
// @material-ui components
import Grid from "@material-ui/core/Grid";
// Components
import RecipeCards from "../Components/RecipeCards.js";
import FilterBoxes from "../Components/FilterBoxes.js";

export default function Home() {
  // state variable to hold array of recipe objects
  const [Recipes, setRecipes] = useState([]);

  // state variable to hold id's of all liked recipes
  const [Liked, setLiked] = useState([]);

  // state variable to hold array of checked filters
  const [Filters, setFilters] = useState([]);

  // upon first render, call functions to get recipes and liked recipes
  useEffect(() => {
    getRecipes();
    retrieveLikes(localStorage.getItem("token"));
  }, []);

  // gets recipes from backend
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

  // function to pass down to filterboxes component to manage filters
  const handleFilters = (filters) => {
    const newFilters = {...Filters};

    const variables = {
      tags: filters,
    };

    getRecipes(variables);
    setFilters(newFilters);
  }

  // get array of id's of liked recipes
  const retrieveLikes = (token) => {
    console.log("Checking liked recipes");
    axios
      .post("http://127.0.0.1:5000/getLikes", {
        token: token,
      })
      .then((response) => {
        let temp = response.data.map(recipe => recipe.id);
        setLiked(temp);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
                <RecipeCards recipes={Recipes} deletable={false} liked={Liked}/>
              }
            </Grid>
          </Grid>
        </Grid>
      </header>
    </div>
  );
}


