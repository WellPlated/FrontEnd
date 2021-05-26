import '../../css/Upload.css';
import React, { useState } from 'react';
import UploadForm from './UploadForm';

function Upload() {

  const [recipe, setRecipe] = useState({title: "", cuisine: "", description: "", ingredients: "", steps: "", tags: ""});
  const [error, setError] = useState("");
  const userToken = localStorage.getItem("token");

  const Upload = details => {
    setRecipe({
      title: details.title,
      cuisine: details.cuisine,
      description: details.description,
      ingredients: details.ingredients,
      steps: details.steps,
      tags: details.tags,
      user_id: userToken,
  });
    console.log(recipe);
  }

  const Error = message => {
    setError(message);
  }

  return (
    <div className="App">
        <div><UploadForm SignUp={Upload} error={Error}/></div>
        <div className="error">{error}</div>
    </div>
  );
}

export default Upload;
