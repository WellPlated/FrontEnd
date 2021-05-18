import '../../css/Login.css';
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router';

function Login() {

  const [user, setUser] = useState({name: "", password: ""});
  const [error, setError] = useState("");

  const Login = details => {
    setUser({
      name: details.name,
      email: details.email
  });
    console.log(user);
    localStorage.setItem("username", details.name);
  }

  const Logout = () => {
    setUser({name: "", password: ""});
    localStorage.clear();
    console.log("logout");
  }

  const Error = message => {
    setError(message);
  }

  return (
    <div className="App">
      { ("username" in localStorage) ? (
        <div className="welcome">
          <h2>Welcome, <span>{localStorage.getItem("username")}</span></h2>
          <button onClick={Logout}>Logout</button>
          </div>
      ) : (
      <div>
        <LoginForm Login={Login} error={Error}/>
        <div className="error">{error}</div>
      </div>
      )}
    </div>
  );
}

export default Login;
