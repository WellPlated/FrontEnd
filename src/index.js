import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import Home from './views/Home/Home.js';
import Login from './views/Login/Login'
import Profile from "./views/Profile/Profile";
import SideNav from "./views/SideNav/SideNav";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist} onUpdate={() => window.scrollTo(0, 0)}>
    <SideNav name="Test" />
    <div className="main-container">
      <Switch>
        <Route path="/Profile" component={Profile} />
        <Route path="/Login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  </Router>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
