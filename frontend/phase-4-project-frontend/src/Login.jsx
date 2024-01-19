import React, { useState } from "react";
import { Navlink } from 'react-router-dom';
import LoginForm from "./LoginForm";
import Header from "./Header";


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
import Header from "./Header";


export default LoginPage;