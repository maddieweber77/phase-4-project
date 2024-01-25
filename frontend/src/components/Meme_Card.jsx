import React, { useState, useEffect } from "react";
import Caption from './Caption'

function Meme_Card({meme, handleVote}) {
        const captions = meme.captions.map(caption => <Caption key = {caption.id} caption = {caption} handleVote = {handleVote}/>)
    return (
        <div className="meme_card">
            <h3 className="meme_description">{meme.description}</h3>
            <img className = "meme_img" src = {meme.img_url}/>
            <div className="captions_list">
                {captions}
            </div>
        </div>
    )

}



export default Meme_Card;