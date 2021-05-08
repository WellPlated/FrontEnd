<<<<<<< Updated upstream:well_plated/src/App.js
import React from 'react';
import './App.css';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
=======
import logo from "../logo.svg";
import "../css/App.css";
>>>>>>> Stashed changes:src/views/Login.js

function Login() {
  return (
<<<<<<< Updated upstream:well_plated/src/App.js
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
      <div className="app-container">
        <div className="main-container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/profile" component={Profile}/>
            <Redirect to="/"/>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
=======
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>THIS IS THE LOGIN PAGE</p>
        <a
          className="App-link"
          href="/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Home
        </a>
      </header>
    </div>
>>>>>>> Stashed changes:src/views/Login.js
  );
}

export default Login;
