import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import Header from "./Header";
import LoginForm from "./LoginForm";


function Login(){

    return (
        <div>
            <Header/>
            <LoginForm/>
        </div>
        )
};


export default Login;