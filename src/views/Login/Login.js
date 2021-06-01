import '../../css/Login.css';
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router';

function Login() {

  const [user, setUser] = useState({name: "", password: ""});
  const [error, setError] = useState("");

  const Login = details => { //login function to set local storage
    setUser({
      name: details.name,
      email: details.email
  });
    console.log(user);
    localStorage.setItem("username", details.name);
  }

  const Logout = () => { //logout function to clear local storage
    setUser({name: "", password: ""});
    localStorage.clear();
    console.log("logout");
  }

  const Error = message => {
    setError(message);
  }

  let history = useHistory()

  const handleOnSubmit = () => { //change to home page on success
    window.location = '/';
  }

  return (
    <div className="App">
      { ("username" in localStorage) ? ( //display welcome message if user is logged in
        <div className="welcome">
          <h2>Welcome, <span>{localStorage.getItem("username")}</span>!</h2>
          <button onClick={Logout}>Logout</button>
          </div>
      ) : ( //display login form if user is not logged in
      <div> 
        <LoginForm Login={Login} error={Error} onSubmit={handleOnSubmit}/>
        <div className="error">{error}</div>
      </div>
      )}
    </div>
  );
}

export default Login;
