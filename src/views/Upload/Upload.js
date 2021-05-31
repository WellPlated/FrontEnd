import '../../css/Upload.css';
import React, { useState } from 'react';
import UploadForm from './UploadForm';

function Upload() {

  const [recipe, setRecipe] = useState({title: "", cuisine: "", description: "", ingredients: "", recipe: "", tags: []});
  const [error, setError] = useState("");
  const userToken = localStorage.getItem("token");

  const Upload = details => {
    
    console.log("uploading");
    localStorage.setItem("recipe", "exists");
    Error("Recipe Posted!")
  }

  const NewUpload = () => {
    setRecipe({title: "", cuisine: "", description: "", ingredients: "", recipe: "", tags: []});
    localStorage.removeItem("recipe");
    console.log("new upload");
  }

  const Error = message => {
    setError(message);
  }
  
  const handleOnSubmit = () => {
    //window.location = '/Profile';
  }

  return (
    <div className="App">
      {/* { ("recipe" in localStorage) ? (
        <div className="welcome">
          <h2>Recipe Posted!</h2>
          <button onClick={NewUpload}>Upload a New Recipe!</button>
          </div>
      ) : ( */}
        <div>
          <UploadForm Upload={Upload} error={Error} onSubmit={handleOnSubmit}/>
          <div className="error">{error}</div>
        </div>
      {/* )}   */}
      
    </div>
  );
}

export default Upload;
