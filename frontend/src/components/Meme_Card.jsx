import React, { useState, useEffect } from "react";

function Meme_Card({meme}) {
        const captions = meme.captions.map(caption => <p key = {caption.id}>{caption.entry}</p>)
    return (
        <div className="meme_card">
            <h3 className="meme_description">{meme.description}</h3>
            <img className = "meme_img" src = {meme.img_url}/>
            <div className="captions">
                {captions}
            </div>
        </div>
    )

}



export default Meme_Card;