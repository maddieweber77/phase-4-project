import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Meme_Card from "../components/Meme_Card";
import { useUser } from "../UserContext";


function Home() {

    const [usersMeme, setUserMemes] = useState([])
    

    useEffect(() => {
        //fetches all memes for the user
        fetch('/api/memes/1').then(resp => resp.json()).then(data => setUserMemes(data))
    }, [])

    console.log(usersMeme)

    //creates meme cards
    const memeCardList = usersMeme.map(meme => <Meme_Card key = {meme.id} meme = {meme}/>)

    //copntrol form for new memes
    //!! Need to updated user idea to be ID of logged in user
    const [newMeme, setNewMeme] = useState({
        "name": "",
        "img_url" : "",
        "caption" : "",
        "user_id" : "1"
    })

    function handleNewMemeInputs(e) {
        let key = e.target.id
        let value = e.target.value
        setNewMeme({...newMeme, [key] : value})
    }

    //handles submission of a new meme
    function handleNewMemeSubmission(e) {
        e.preventDefault()

        fetch('/api/meme', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMeme)
        }).then(resp => resp.json())
        .then(data => console.log(data))
    }

    //handles patching memes
    '/api/meme/<int:id>'

    return (
        <div>
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
            {memeCardList}
        </div>
    );
}

export default Home;
