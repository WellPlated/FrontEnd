import '../../css/Login.css';
import React, { useState } from 'react';
import LoginForm from './LoginForm';

function Login() {

  const [user, setUser] = useState({name: "", password: ""});
  const [error, setError] = useState("");

  const Login = details => {
    setUser({
      name: details.name,
      email: details.email
  });
    console.log(user);
  }

  const Logout = () => {
    setUser({name: "", password: ""});
    console.log("logout");
  }

  const Error = message => {
    setError(message);
  }

  return (
    <div className="App">
      { (user.name !== "") ? (
        <div className="welcome">
          <h2>Welcome, <span>{user.name}</span></h2>
          <button onClick={Logout}>Logout</button>
          </div>
      ) : (
      <div>
        <LoginForm Login={Login} error={Error}/>
        <div>{error}</div>
      </div>
      )} 
    </div>
  );
}

export default Login;
