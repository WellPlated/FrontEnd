import "../../css/Profile.css";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import RecipeCard from "../Components/Recipe";
import { makeStyles } from '@material-ui/core/styles';

const name = "John Doe";//Filler for now
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 200,
  },
}));//Modify RecipeCard size for making display better

function Profile() {
  const classes = useStyles();
  return (
    <div className="Profile">
      <header className="Profile-header">
        <Grid container direction="row" justify='center' spacing={1}>
          <Grid item xs={1}></Grid>
          <Grid item xs={9}>
            <b className="headerPage">{name}</b>
          </Grid>
          <Grid item xs={1}>
            <Avatar></Avatar>
          </Grid>
        </Grid>
      </header>
      
      <header className="Profile-content-background">
        <header className="Profile-content">

          <Grid container direction="row" spacing={1}>
            <Grid item xs={5}>
              <div className="headerProfilePage">My Recipes</div>
              <Grid container direction="row" justify="center" spacing={1}>
                <Grid item xs={5} md={3} className={classes.root} ><RecipeCard /></Grid>
                <Grid item xs={5} md={3} className={classes.root} ><RecipeCard /></Grid>
                <Grid item xs={5} md={3} className={classes.root} ><RecipeCard /></Grid>
                <Grid item xs={5} md={3} className={classes.root} ><RecipeCard /></Grid>
              </Grid>
            </Grid>
        
        <Divider orientation="vertical" justify="center" class="Profile-divider" flexItem/>
        
        <Grid item xs={5}>
          <div className="headerProfilePage">Liked Recipes</div>
          <Grid container direction="row" justify="center" spacing={1}>
            <Grid item className={classes.root} ><RecipeCard /></Grid>
            <Grid item className={classes.root} ><RecipeCard /></Grid>
            <Grid item className={classes.root} ><RecipeCard /></Grid>
            <Grid item className={classes.root} ><RecipeCard /></Grid>
          </Grid>
        </Grid>
      </Grid>
      

      </header>
      </header> 
    </div>);
}

export default Profile;
