import React, {useState} from "react";
import { NavLink } from "react-router-dom";



function Header(){

    return(
        <div className="header-div">
            <h1 id='app-title'>BATTLEMEMES</h1>
            <NavLink to='/Home'>
                <button>Home</button>
            </NavLink>        
            <NavLink to='/Profile'>
                <button>Profile</button>
            </NavLink>
            <NavLink to='/Caption-Meme'>
                <button>Caption Meme</button>
            </NavLink>
            <NavLink to='/Battle-Memes'>
                <button>Battle Memes</button>
            </NavLink>
            <NavLink to='/'>
                <button>Logout</button>
            </NavLink>
        
            {/* if the user is signed in, below button should be "Profile" but otherwise should be "Sign In". We also need to redirect them to either the signin page or the profile depending on the button
            {isLoggedIn ? 
                (
                <NavLink to='/Profile'>
                    <button>Profile</button>
                </NavLink>
                ) : (
                <NavLink to='/'>
                    <button>Login</button>
                </NavLink>
                )
            } */}
        
        </div>
    );
};


export default Header;

