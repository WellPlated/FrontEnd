import { KeyboardTab, SettingsInputSvideoRounded, SettingsSystemDaydreamTwoTone } from '@material-ui/icons';
import React, { useState } from 'react';
import axios from 'axios';
import '../../css/Upload.css';
import Select from "react-select";

function UploadForm({ Upload, error, onSubmit }) {
    const [details, setDetails] = useState({title: "", cuisine: "", description: "", ingredients: "", recipe: "", tags: []});
    var today = new Date();
    const recipeDate = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear() ;
    const userToken = localStorage.getItem("token");

    
    const handleChange = (event) => {
        let tempItems = []
        let items = [...details.tags]
        if(!items.includes(event.target.value)){
            items.push(event.target.value)
        } else{
            if(items.length === 1 || items.length === 0){
                items = []
            }else{
                for (var i = 0; i < items.length; i++) { 
                    if(items[i] !== event.target.value){
                        tempItems.push(items[i])
                    } 
                }
                items = tempItems
            }
        }
        setDetails({...details, tags: items})
    };

    const submitHandler = e => {
        e.preventDefault();

        axios.post('http://127.0.0.1:5000/upload', {
            title : details.title,
            date: recipeDate,
            cuisine : details.cuisine,
            description: details.description,
            ingredients: details.ingredients,
            recipe: details.recipe,
            tags: details.tags,
            user_id: userToken,
        })
            .then(function(response){
                if (response['data']['status'] === 200) {
                    localStorage.setItem("recipe", "exists");
                    Upload()
                    onSubmit()
                    console.log("uploaded recipe")
                }
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
                    <select type="text" name="cuisine" id="cuisine" 
                    onChange={e => setDetails({...details, cuisine: e.target.value})} value={details.cuisine}>
                        <option value="American">American</option>
                        <option value="Italian">Italian</option>
                        <option value="Thai">Thai</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Vietnamese">Vietnamese</option>
                        <option value="Indian">Indian</option>
                        <option value="Mexican">Mexican</option>
                        <option value="French">French</option>
                        <option value="Greek">Greek</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Drinks/Beverages">Drinks/Beverages</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Recipe Description: </label>
                    <input type="text" name="description" id="description" 
                    onChange={e => setDetails({...details, description: e.target.value})} value={details.description}/>
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients: (Separate with Commas)</label>
                    <textarea type="text" name="ingredients" id="ingredients" 
                    onChange={e => setDetails({...details, ingredients: e.target.value})} value={details.ingredients}/>
                </div>
                <div className="form-group">
                    <label htmlFor="recipe">Steps: (Separate by Commas) </label>
                    <textarea type="text" name="recipe" id="recipe" 
                    onChange={e => setDetails({...details, recipe: e.target.value})} value={details.recipe}/>
                </div>
                <div className="form-group">
                    <label htmlFor="tags">Select All Tags that Apply: </label>
                    <select multiple={true} name="tags" id="tags" 
                    onChange={handleChange} value={details.tags}>
                        <option value="Chinese">Chinese</option>
                        <option value="French">French</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Italian">Italian</option>
                        <option value="American">American</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Vegan">Vegan</option>
                        <option value="Keto">Keto</option>
                        <option value="Paleo">Paleo</option>
                        <option value="Nut-Free">Nut-Free</option>
                        <option value="Dairy-Free">Dairy-Free</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Drinks">Drinks/Beverages</option>
                        
                    
                    </select>
                    
                    
                </div>
                <input type="submit" value="UPLOAD" />
            </div>
        </form>
    )
}

export default UploadForm;