import "../../css/About.css";
// import Grid from "@material-ui/core/Grid";


export default function AboutUs (){
    
    return (
      
      <div className="AboutUsPage">
        <div >
          <div className="aboutHeader">
            <h2>Welcome to Well Plated! </h2>
          </div>
          <div className="aboutParagraph">
            <h2> Our goal!</h2>
            <p>
                Welcome to Well Plated. Our goal is to build a social network that allows users to share recipes with each other. To begin with, each user will have their own 
                profile on which they can post their own original recipes. Each user will be able to tag their recipes based on the categories that the recipe falls in (i.e french,
                 chinese, Low-calorie, high-protein, etc.). This tagging system will allow the app to have niches for different users to post the recipes that they are passionate 
                 about.
            </p>
            <p>
                In terms of engagement, users have two main options - they can like or share the recipes. All recipes are available in the Well Plated Kitchen Cache - thus enabling a 
                spread of the most popular recipes throughout the app. Recipes will also be able to be shared via a link outside of the app, and therefore even those without the app 
                will be able to view recipes. All of this will be delivered to the user through a web application that will be designed with mobile in mind. 
            </p>
          </div>
          <div className="aboutTeam">
              <h2> About the Team! </h2>
              <p>Well Plated stems from a group project, our team consists of 6 students all pursuing a Bachelors Degree in Computer Science at UCLA. As part of our software
                  construction project for the class CS35, taught by Prof Eggert, we developed Well Plated over the course of 6 weeks. 
              </p>

              <p>The Team: Kratik Agrawal, Tanaya Nawathe, Medha Kini, Shounak Kuiry, Abhigya Sodani, and Michael Simon</p>
          </div>
  

        </div>
      </div>
      
    );
  }