import '../../css/SignUp.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router'
import { withRouter } from "react-router";
import SignUpForm from './SignUpForm';

function SignUp() {

  const [user, setUser] = useState({email: "", name: "", password: ""});
  const [error, setError] = useState("");

  const SignUp = details => { //signup function to set username in local storage
    setUser({
      email: details.email,
      name: details.name,
      password: details.password
  });
    console.log(user);
    localStorage.setItem("username", details.name);
  }

  const Error = message => {
    setError(message);
  }

  let history = useHistory()

  const handleOnSubmit = () => { //go to home page on successful submit
    window.location = '/';;
  }

  return (
    <div className="App">
      <div>
        <div><SignUpForm SignUp={SignUp} error={Error} onSubmit={handleOnSubmit}/></div>
        <div className="error">{error}</div>
      </div>
  </div>
  );
}

export default SignUp;
