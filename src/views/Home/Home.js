import '../../css/Home.css';
// @material-ui components
import Grid from "@material-ui/core/Grid";
// Components
import SideNav from "../SideNav/SideNav.js";
import RecipeCard from "../Components/Recipe";


function Home(props) {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1>Our Kitchen Cache</h1>
        <RecipeCard />
        <Grid container spacing={3}>
          <Grid item>Item</Grid>
          
        </Grid>
      </header>
    </div>
  );
}

export default Home;
