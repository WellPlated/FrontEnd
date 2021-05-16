import { SettingsInputSvideoRounded, SettingsSystemDaydreamTwoTone } from '@material-ui/icons';
import React, { useState } from 'react';
import axios from 'axios';
import '../../css/Login.css';

function LoginForm({ Login, error }) {
    const [details, setDetails] = useState({name: "", password: ""});

    const submitHandler = e => {
        e.preventDefault();

        axios.post('http://127.0.0.1:5000/login', {
            username : details.name,
            password : details.password
        })
            .then(function(response){
                console.log(response);
                if (response['data']['status'] === 200) {
                    Login(details);
                    localStorage.setItem("token", response['data']['access_token'])
                    console.log(localStorage.getItem("token"))
                }
                else if (response['data']['status'] === 403) {
                    error(response['data']['message'])
                }
        })
        .catch(function(error){
            console.log(error);
       //Perform action based on error
        });
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Welcome!</h2>
                { /* Error */}
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
                <input type="submit" value="LOGIN" />
            </div>
        </form>
    )
}

export default LoginForm;