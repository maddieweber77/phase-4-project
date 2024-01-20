import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import Header from "./Header";
import LoginForm from "./LoginForm";


function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleLoginSubmit(e) {
        e.preventDefault();
        setUsername ? Error("Invalid Username/Password") : username;
        setPassword ? Error("Invalid Username/Password") : password;
    }


    return (
        <div>
            <Header/>
            <LoginForm/>
        </div>
        )
};


export default Login;