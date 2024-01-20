import React, { useState, useEffect } from "react";


function LoginForm() {

    // could be used for Sign in page, include Post request to profile
    // Login needs to be checked against username and password stored in the backend

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLoginSubmit(e) {
        e.preventDefault();

        const response = useEffect(()=> {
            fetch('https//localhost:5555/users', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(username, password)
            })

            })

            if (response.success){
                return "Login Successful"
            } else {
                return Error("Incorrect Login Info")
            }

        };


        // setUsername ? Error("Invalid Username/Password") : username;
        // setPassword ? Error("Invalid Username/Password") : password;

         // if (username != {saved password}){
        //     return Error("Invalid Username/Password")
        // }
        // if (password!= {saved password}){
        //     return Error("Invalid Username/Password")
        // }
    

    return(
        <form id='login-form' 
        onSubmit={handleLoginSubmit}
        >
            <label>
            Username:
            </label>
            <input
                type='text'
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <label>
            Password:
            </label>
            <input
                type='password'
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Submit</button>
        </form>
    )
    };

export default LoginForm;