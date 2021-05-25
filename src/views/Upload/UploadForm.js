import { SettingsInputSvideoRounded, SettingsSystemDaydreamTwoTone } from '@material-ui/icons';
import React, { useState } from 'react';
import axios from 'axios';
import '../../css/Upload.css';

function UploadForm({ Login, error }) {
    const [details, setDetails] = useState({title: "", cuisine: "", description: "", ingredients: "", recipe: "", tags: ""});
    var today = new Date();
    const recipeDate = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() ;
    const userToken = localStorage.getItem("token");

    const submitHandler = e => {
        e.preventDefault();

        axios.post('http://127.0.0.1:5000/upload', {
            title : details.title,
            date: recipeDate,
            //cuisine : details.cuisine,
            description: details.description,
            ingredients: details.ingredients,
            recipe: details.recipe,
            tags: details.tags,
            user_id: userToken,
        })
            .then(function(response){
                console.log(response);
                // if (response['data']['status'] === 200) {
                //     Login(details);
                //     localStorage.setItem("token", response['data']['access_token'])
                //     console.log(localStorage.getItem("token"))
                // }
                if (response['data']['status'] === 403) {
                    error(response['data']['message'])
                }
        })
        .catch(function(error){
            console.log(error);
       //Perform action based on error
        });
    }

    return (
        <form onSubmit={submitHandler} >
            <div className="form-inner">
                <h2>Upload a Recipe!</h2>
                { /* Error */}
                <div className="form-group">
                    <label htmlFor="name">Recipe Name: </label>
                    <input type="text" name="name" id="name" 
                    onChange={e => setDetails({...details, title: e.target.value})} value={details.title}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cuisine">Recipe Cuisine: </label>
                    <input type="text" name="cuisine" id="cuisine" 
                    onChange={e => setDetails({...details, cuisine: e.target.value})} value={details.cuisine}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Recipe Description: </label>
                    <input type="text" name="description" id="description" 
                    onChange={e => setDetails({...details, description: e.target.value})} value={details.description}/>
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients: (Separate with Commas)</label>
                    <input type="text" name="ingredients" id="ingredients" 
                    onChange={e => setDetails({...details, ingredients: e.target.value})} value={details.ingredients}/>
                </div>
                <div className="form-group">
                    <label htmlFor="recipe">Steps: (Separate by Commas) </label>
                    <input type="text" name="recipe" id="recipe" 
                    onChange={e => setDetails({...details, recipe: e.target.value})} value={details.recipe}/>
                </div>
                <input type="submit" value="Publish" />
            </div>
        </form>
    )
}

export default UploadForm;