import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
// Components
import App from './views/App';
import Login from './views/Login.js'

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
      <Switch>
        <Route path="/Login" component={Login} />
        <Route path="/" component={App} />
      </Switch>
      
      <App />

  </Router>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
