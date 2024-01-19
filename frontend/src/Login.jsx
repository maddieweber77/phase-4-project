import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import Header from "./Header";
import LoginForm from "./LoginForm";


function LoginPage(){

    const [login, setLogin] = useState(false)

        

    return (
        <div>
            <Header/> 
            <h1 id='login-header'>MEMEWARS</h1>
            <h2 id= 'login-text'>Login</h2>
            <LoginForm />
        </div>

    );
}


export default LoginPage;