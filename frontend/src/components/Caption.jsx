import React, { useState, useEffect } from "react";


function Caption({caption, handleVote}) {

    const [memeCaption, setMemeCaption] = useState(caption.entry)

    function handleMouseEnter(){
        setMemeCaption(`🥇 ${caption.entry}`)
    }

    function handleMouseLeave(){
        setMemeCaption(caption.entry)
    }

    return(
        <>
            <p className = {'caption'} onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave} onClick = {() => handleVote(caption.meme_id, caption.id)}>{memeCaption}</p>
        </>
    )
}

export default Caption;