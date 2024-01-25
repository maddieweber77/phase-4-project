import React, { useState, useEffect } from "react";
import Inert_Caption from './Inert_Caption'

function Captioning_Meme_Card({meme, handleCaption}) {
    const [newCaption, setNewCaption] = useState("")

    function handleNewCaption(e){
        setNewCaption(e.target.value)
    }

    function handleCaptionSubmit(e) {
        e.preventDefault()
        handleCaption(newCaption, meme.id)
        setNewCaption("")
    }

    const captions = meme.captions.map(caption => <Inert_Caption key = {caption.id} caption = {caption}/>)

    return (
        <div className="meme_card">
            <h3 className="meme_description">{meme.description}</h3>
            <img className = "meme_img" src = {meme.img_url}/>
            <div className="captions_list">
                {captions}
                <form className = {"new_caption_form"} onSubmit={handleCaptionSubmit}>
                    <label htmlFor="caption">Submit New Caption</label>
                    <input id="caption" type="text" onChange = {handleNewCaption} value = {newCaption}/>
                    <input className = "new_meme_submit" type = "submit" />
                </form>
            </div>
        </div>
    )

}



export default Captioning_Meme_Card;