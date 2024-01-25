import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Winning_Meme_Card from "../components/Winning_Meme_Card";


function All_finished_memes() {

const [allFinishedMemes, setAllFinishedMemes] = useState([])

useEffect(() => {fetch('/api/all_finished_memes').then(resp => resp.json()).then(data => setAllFinishedMemes(data))}, [])

let complete_memes = allFinishedMemes.map(meme => <Winning_Meme_Card key = {meme.id} meme = {meme}/>)

    return (
        <>
            <Header />
            {complete_memes}
        </>
    )
    }

export default All_finished_memes