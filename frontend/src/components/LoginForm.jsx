import React, { useState, useEffect } from "react";


function LoginForm({ attemptLogin}) {

    // could be used for Sign in page, include Post request to profile
    // Login needs to be checked against username and password stored in the backend

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLoginSubmit(e) {
        e.preventDefault();

        attemptLogin({"username": username, "password": password})
        };

        const handleChangeUsername = e => setUsername(e.target.value)
        const handleChangePassword = e => setPassword(e.target.value)
    

    return(
        <form id='login-form' 
        onSubmit={handleLoginSubmit}
        >
            <label className='login-text'>
            Username:
            </label>
            <input
                type='text'
                placeholder="Enter your username"
                className='login-input'
                value={username}
                onChange={handleChangeUsername}
            />
            <label className='login-text'>
            Password:
            </label>
            <input
                type='password'
                placeholder="Enter your password"
                className='login-input'
                value={password}
                onChange={handleChangePassword}
            />
            <button id='login-submit-button' type='submit'>Submit</button>
        </form>
    )
    };

export default LoginForm;