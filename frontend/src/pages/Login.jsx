import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";


function Login(){

    return (
        <div className="login-page-div">
            <Header/>
            <LoginForm/>
        </div>
        )
};


export default Login;