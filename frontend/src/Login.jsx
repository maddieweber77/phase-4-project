import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import Header from "./Header";
import LoginForm from "./LoginForm";


function Login(){

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // function handleLoginSubmit(e) {
        // e.preventDefault();
        // if (username != {saved password}){
            // return Error("Invalid Username/Password")
        // }
        // if (password!= {saved password}){
            // return Error("Invalid Username/Password")
        // }
    // }

    return (
        <div>
            <Header/>
            <LoginForm/>
        </div>
        )
};


export default Login;