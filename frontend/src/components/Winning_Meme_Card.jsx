import React, { useState, useEffect } from "react";
import Caption from './Caption'

function Winning_Meme_Card({meme}) {

    let winningMemeText = ""

    for(let caption of meme.captions){
        if (caption.id == meme.winning_caption) {
            winningMemeText = caption.entry
        }
    }


    return (
        <div className="meme_card">
            <h3 className="meme_description">{meme.description}</h3>
            <div>
                <img className = "meme_img" src = {meme.img_url}/>
                <p className = "response-overlay">{winningMemeText}</p>
            </div>
        </div>
    )

}



export default Winning_Meme_Card;