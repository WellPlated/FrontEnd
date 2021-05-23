import '../../css/SignUp.css';
import React, { useState } from 'react';
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

  return (
    <div className="App">
        <div><SignUpForm SignUp={SignUp} error={Error}/></div>
        <div className="error">{error}</div>
    </div>
  );
}

export default SignUp;
