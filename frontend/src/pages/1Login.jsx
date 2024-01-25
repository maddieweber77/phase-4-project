import React, { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import LoginForm from "../components/LoginForm";



function Login(){

    const [user, setUser] = useState('')

    useEffect(() => {

        fetch('api/check_session')
        .then((res) => {
            if (res.ok) {
                res.json()
            }
        })
        .then((user) => {
            console.log(user)
            setUser(user)
        });
    }, []
    );


    // May need to change component where attemptLogin is placed
    function attemptLogin(userInfo){

        console.log(userInfo)



            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(userInfo)
            })
            .then((res) => {
                if (res.ok){
                    return res.json()
                }
                throw res;
            })
            .then((data) => {
                console.log(data); 
                setUser(data);
            })
            // add navigate logic outside of useEffect
            }
            if (user) {
                return <Navigate to='/Home' />;
            } 
            

    return (
        <div className="login-page-div">
            <h1 id='app-title'>BATTLEMEMES</h1>
            <LoginForm attemptLogin={attemptLogin}/>
        </div>
        )
};


export default Login;