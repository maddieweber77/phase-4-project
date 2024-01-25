import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { useUser } from "../UserContext";



function Header(){

    const {user, setUser} = useUser()

    // Will likely have to move logout function to Login or Home
    // Set up handleClickLogout function
    // need to pass down setUser

    function logout() {
        fetch(`/api/logout`, { method: "DELETE" }).then((res) => {
            if (res.ok) {
                setUser(null);
            }
        });
    }

    return(
        <div className="header-div">
            <h1 id='app-title'>BATTLEMEMES</h1>
            <NavLink to='/Home'>
                <button>Home</button>
            </NavLink>        
            <NavLink to='/Profile'>
                <button>Profile</button>
            </NavLink>
            <NavLink to='/'>
                <button onClick={logout}>Logout</button>
            </NavLink>
        
            {/* if the user is signed in, below button should be "Profile" but otherwise should be "Sign In". We also need to redirect them to either the signin page or the profile depending on the button*/}
            {/* {isLoggedIn ? 
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

