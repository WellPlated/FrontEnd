import '../../css/Home.css';
// @material-ui components
import Grid from "@material-ui/core/Grid";
// Components
import SideNav from "../SideNav/SideNav.js";
import Recipes from "../Components/Recipes.js";

function Home(props) {
  return (
    <div className="Home">
      <header className="Home-header">
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <h1>Our Kitchen Cache</h1>
          </Grid>
          <Recipes />
        </Grid>
      </header>
    </div>
  );
}

export default Home;
