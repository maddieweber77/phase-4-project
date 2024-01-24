import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from "../components/Header";

import Leaderboard from "../components/Leaderboard";
import Created_Cards from "../components/Created_Cards";
import Caption_Cards from "../components/Caption_Card_List";
import Friend_Cards from "../components/Friend_Cards";
import Vote_Cards from "../components/Vote_Cards";
import Caption_Cards_List from "../components/Caption_Card_List";


function Home() {
    const [userMemes, setUserMemes] = useState({})
    const [memesToBeCaptioned, setMemesToBeCaptioned] = useState([])
    const [memesToBeVotedOn, setMemesToBeVotedOn] = useState({})
    const [completedMemes, setCompletedMemes] = useState([])
    const [friends, setFriends] = useState({})
    const [notFriends, setNotFriends] = useState({})

    //fetches all info for the subsequent pages
    useEffect(() => {
        //fetches all memes that the user has created
        fetch('/memes').then(resp => resp.json()).then(data => setUserMemes(data))
        //fetches all memes that the user needs to caption
        fetch('/memes').then(resp => resp.json()).then(data => setMemesToBeCaptioned(data))
        //fetches all memes that the user needs to vote on
        //! how does this pull the proper responses though for the memes?
        fetch('/memes').then(resp => resp.json()).then(data => setMemesToBeVotedOn(data))
        //fetches all memes that the are complete
        fetch('/memes').then(resp => resp.json()).then(data => setCompletedMemes(data))
        //fetches all friends of that user
        fetch('/friends').then(resp => resp.json()).then(data => setFriends(data))
        //fetches users who are not currently friends
        fetch('/users').then(resp => resp.json()).then(data => setNotFriends(data))
    }, [])

    //copntrol form for new memes
    //!! Need to updated user idea to be ID of logged in user
    const [newMeme, setNewMeme] = useState({
        "name": "",
        "img_url" : "",
        "caption" : "",
        "creator_id" : "1"
    })

    function handleNewMemeInputs(e) {
        let key = e.target.id
        let value = e.target.value
        setNewMeme({...newMeme, [key] : value})
    }

    //handles submission of a new meme
    function handleNewMemeSubmission(e) {
        e.preventDefault()

        fetch('/memes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMeme)
        }).then(resp => resp.json())
        .then(data => console.log(data))
    }

    return (
        <div className = "grid_container">
            <Header />
            <div className="meme_creator">
                <h1>Add a Meme!</h1>
                <div className="meme_creator_container">
                    <img id = "img_creator_meme" src = {newMeme.img_url != "" ? newMeme.img_url : "https://i.imgflip.com/3u04h5.jpg?a473832"}/>
                    <form className = "new_meme_submission_form" onSubmit = {handleNewMemeSubmission}>
                        <label htmlFor="img_url">Meme Image URL</label>
                        <input id="img_url" type="text" onChange = {handleNewMemeInputs} value = {newMeme.img_url}/>
                        <label htmlFor="name">Name Meme</label>
                        <input id="name" type="text" onChange = {handleNewMemeInputs} value = {newMeme.name}/>
                        <label htmlFor="caption">Meme Caption</label>
                        <input id="caption" type="text" onChange = {handleNewMemeInputs} value = {newMeme.caption}/>
                        <input type = "submit" />
                    </form>
                </div>
            </div>
            {/* <Created_Cards userMemes={userMemes}/> */}
            <Caption_Cards_List memesToBeCaptioned = {memesToBeCaptioned}/>
            {/* <Vote_Cards memesToBeVotedOn = {memesToBeVotedOn}/> */}
            <Vote_Cards/>
            <Leaderboard completedMemes={completedMemes}/>
            {/* <Friend_Cards friends = {friends} notFriends = {notFriends}/> */}


        </div>
    );
}

export default Home;
