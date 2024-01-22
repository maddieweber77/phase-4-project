import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function Home() {

    return(
        <main>
            <Header/>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <NavLink to='/Login'>
                    <button id='login-button' className='button-text'>Login</button>
                </NavLink>
            <p>
                Edit <code>src/App.jsx</code> and save to test HMR
            </p>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
        </main>
    )

}

export default Home;
