import "../../css/Confirmation.css";
import Grid from "@material-ui/core/Grid";


export default function Confirmation (){
    
    return (
      <div className="recipe-page">
        <div className="recipe-posted">
            <h4>Your Recipe has been posted!</h4>
            <div className="buttons">
                <a href="/Upload">Upload a New Recipe</a>
                <a href="/Profile">Go to Profile</a>
            </div>
        </div>
        
      </div>
    );
  }