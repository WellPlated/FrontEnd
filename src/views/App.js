import logo from '../logo.svg';
import '../css/App.css';
// Components
import SideNav from "./SideNav.js";

function App(props) {
  return (
    <div className="App">
      <header className="App-header">
        <SideNav name="Test">

        </SideNav>
        <img src={logo} className="App-logo" alt="logo" />
        
      </header>
    </div>
  );
}

export default App;
