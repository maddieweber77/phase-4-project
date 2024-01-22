import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import LoginForm from "../components/LoginForm";


function Login(){

    return (
        <div className="login-page-div">
            <LoginForm/>
        </div>
        )
};


export default Login;