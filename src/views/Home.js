import '../css/Home.css';
// Components
import SideNav from "./SideNav.js";

function Home(props) {
  return (
    <div className="Home">
      <header className="Home-header">
        <SideNav name="Test" />
        <p>
          Home
        </p>
        
      </header>
    </div>
  );
}

export default Home;
