import { SettingsInputSvideoRounded, SettingsSystemDaydreamTwoTone } from '@material-ui/icons';
import React, { useState } from 'react';
import axios from 'axios';
import Login from '../Login/Login';
import '../../css/SignUp.css';

function SignUpForm({ SignUp, error, onSubmit }) {
    const [details, setDetails] = useState({email: "", name: "", password: ""});

    const submitHandler = e => {
        e.preventDefault();
        // register a user (signup)
        axios.post('http://127.0.0.1:5000/signup', {
            email : details.email,
            username : details.name,
            password : details.password,
        })

        .then (function(response) {
            console.log(response);
            if (response['data']['status'] === 200) {
                console.log("Sign up was successful!")
                onSubmit()
                SignUp(details)
                // automatically log in the user
            }
            else if (response['data']['status'] === 403) {
                error(response['data']['message'])
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }

    return ( //set up sign up form entries, set details on change
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Enter information</h2>
                <div className="form-group">
                    <label htmlFor="email">Email: </label>
                    <input type="text" name="email" id="email" 
                    onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="name">Username: </label>
                    <input type="text" name="name" id="name" 
                    onChange={e => setDetails({...details, name: e.target.value})} value={details.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" 
                    onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                </div>
                <input type="submit" value="SIGN UP" />
            </div>
        </form>
    )
}

export default SignUpForm;