import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Captioning_Meme_Card from "../components/Captioning_Meme_Card";
import { useUser } from "../UserContext";


function All_open_memes() {

    const [allOpenMemes, setAllOpenMemes] = useState([])
    const {user, setUser} = useUser()

    useEffect(() => {
    fetch(`/api/all_open_memes/${user.id}`).then(resp => resp.json()).then(data => setAllOpenMemes(data))}
    , [])

    function handleCaption(caption, memeId) {
        let newCaption = {
            "entry": caption,
            "contestant_id": user.id,
            "meme_id": memeId
        }
        fetch('/api/caption', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCaption)
        }).then(resp => resp.json())
        .then((data) => {
            let newOpenMemeList = allOpenMemes.map(meme => {
                if(meme.id == memeId){
                    meme.captions.push(data)
                }
                return meme
            })
            setAllOpenMemes(newOpenMemeList)
            }
            )
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
