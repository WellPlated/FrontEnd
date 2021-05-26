import '../../css/SignUp.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router'
import { withRouter } from "react-router";
import SignUpForm from './SignUpForm';

function SignUp() {

  const [user, setUser] = useState({email: "", name: "", password: ""});
  const [error, setError] = useState("");

  const SignUp = details => {
    setUser({
      email: details.email,
      name: details.name,
      password: details.password
  });
    console.log(user);
  }

  const Error = message => {
    setError(message);
  }

  let history = useHistory()

  const handleOnSubmit = () => {
    history.push(`/Profile`);
  }

  return (
    <div className="App">
        <div><SignUpForm SignUp={SignUp} error={Error} onSubmit={handleOnSubmit}/></div>
        <div className="error">{error}</div>
    </div>
  );
}

export default SignUp;
