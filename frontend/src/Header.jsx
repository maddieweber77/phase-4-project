

function Header(){

    return(
        <>
        <h1 id='app-title'>MEMEWARS</h1>
        <button>Home</button>
        {/* if the user is signed in, below button should be "Profile" but otherwise should be "Sign In". We also need to redirect them to either the signin page or the profile depending on the button*/}
        <button>Profile</button>

        </>
    )
}


export default Header;

