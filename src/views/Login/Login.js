import '../../css/Login.css';
import React, { useState } from 'react';
import LoginForm from './LoginForm';

function Login() {

  const [user, setUser] = useState({name: "", password: ""});
  const [error, setError] = useState("");

  const Login = details => {
    console.log(details);
  }

  const Logout = () => {
    console.log("logout");
  }

  return (
    <div className="App">
      { (user.name != "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button>Logout</button>
          </div>
      ) : (
      <LoginForm Login={Login} error={error}/>
      )} 
    </div>
  );
}

export default Login;
