import React, {useState} from "react";
import { NavLink } from "react-router-dom";



function Header(){

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return(
        <div>
            <h1 id='app-title'>BATTLEMEMES</h1>
            <NavLink to='/'>
                <button>Home</button>
            </NavLink>
        
            {isLoggedIn ? 
                (
                <NavLink to='/'>
                    <button>Profile</button>
                </NavLink>
                ) : (
                <NavLink to='/Login'>
                    <button>Login</button>
                </NavLink>
                )
            }
            {/* if the user is signed in, below button should be "Profile" but otherwise should be "Sign In". We also need to redirect them to either the signin page or the profile depending on the button*/}
        
        </div>
    );
};


export default Header;

