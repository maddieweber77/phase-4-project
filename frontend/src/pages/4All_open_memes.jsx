import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Captioning_Meme_Card from "../components/Captioning_Meme_Card";


function All_open_memes() {

    const [allOpenMemes, setAllOpenMemes] = useState([])

    fetch('/api/all_open_memes/1').then(resp => resp.json()).then(data => setAllOpenMemes(data))

//!! need to pull down user id from loggin

    function handleCaption(caption, memeId) {
        let newCaption = {
            "entry": caption,
            "contestant_id": 1,
            "meme_id": memeId
        }
        fetch('/api/caption', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCaption)
        }).then(resp => resp.json())
        .then(data => console.log(data))
    }

    const listOfOpenMemes = allOpenMemes.map(meme => <Captioning_Meme_Card key = {meme.id} meme = {meme} handleCaption = {handleCaption}/>)
    



    return (
        <>
            <Header />
            {listOfOpenMemes}
        </>
    )
    }

export default All_open_memes
