import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";

function Home() {
    const [userMemes, setUserMemes] = useState({})
    const [memesToBeCaptioned, setMemesToBeCaptioned] = useState({})
    const [memesToBeVotedOn, setMemesToBeVotedOn] = useState({})
    const [completedMemes, setCompletedMemes] = useState({})
    const [friends, setFriends] = useState({})
    const [notFriends, setNotFriends] = useState({})

    useEffect(() => {
        //fetches all memes that the user has created
        fetch('http://localhost:3000/memes').then(resp = resp.json()).then(data = setUserMemes(data))
        //fetches all memes that the user needs to caption
        fetch('http://localhost:3000/memes').then(resp = resp.json()).then(data = setMemesToBeCaptioned(data))
        //fetches all memes that the user needs to vote on
        fetch('http://localhost:3000/memes').then(resp = resp.json()).then(data = setMemesToBeVotedOn(data))
        //fetches all memes that the are complete
        fetch('http://localhost:3000/memes').then(resp = resp.json()).then(data = setCompletedMemes(data))
        //fetches all friends of that user
        fetch('http://localhost:3000/friends').then(resp = resp.json()).then(data = setFriends(data))
        //fetches users who are not currently friends
        fetch('http://localhost:3000/users').then(resp = resp.json()).then(data = setNotFriends(data))
    }, [])


    return (
        <main>
            <Header />
            <div className="meme_creator">
            </div>
            <Created_Cards userMemes={userMemes}/>
            <Caption_Cards memesToBeCaptioned = {memesToBeCaptioned}/>
            <Vote_Cards memesToBeVotedOn = {memesToBeVotedOn}/>
            <Leaderboard completedMemes={completedMemes}/>
            <Friend_Cards friends = {friends} notFriends = {notFriends}/>


        </main>
    );
}

export default Home;
