import React, {useEffect, useState} from "react";
import Header from "../components/Header";




// need to add path to Routes

function Profile() {
    // Move state to different page?
    // const [featuredProfile, setFeaturedProfile] = useState('')
    const [loggedInUser, setLoggedInUser] = useState(null);
    
    // GET request for profile information
    // Contingent upon being logged in
    useEffect(()=> {

        fetch(`api/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setLoggedInUser(data)
        })
    }, [])

    // PATCH to edit Profile info i.e. Name
    // Should user be allowed to edit username as well?


    return (
        <div>
            <Header/>
            <div id="profile-info-div">
                <img id='profile-picture' src={loggedInUser.profile_picture} alt='Profile Picture'></img>
                <h2 id='profile-name' alt='Profile Name'>{loggedInUser.user_name}</h2>
                <h3 className="profile-info" alt='Profile Username'>Username: {loggedInUser.username}</h3>
                {/* Edit below to match desired output, i.e. Score or Ranking */}
                <h3 className="profile-info" alt='Total Points'>Total Points: {loggedInUser.total_points} </h3>
                {/* <h3 className="profile-info">Ranking: {}</h3> */}
            </div> 
        </div>
    )


}

export default Profile;