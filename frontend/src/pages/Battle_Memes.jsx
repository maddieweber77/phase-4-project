import React, { useState, useEffect } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import Header from "../components/Header";

function Battle_Memes() {
    const [responses, memes, users] = useLoaderData();
    const [topMeme, setTopMeme] = useState({});
    const [bottomMeme, setBottomMeme] = useState({});
    const [votedMemes, setVotedMemes] = useState([]);
    const [topCaption, setTopCap] = useState("");
    const [bottomCaption, setBottomCap] = useState("");

    const availableMemes = memes.filter((meme) => {
        // Filter out memes that are already voted
        return !votedMemes.some((item) => item.meme_id === meme.id);
    });
    
    const randomIndex = Math.floor(Math.random() * availableMemes.length);
    const selectedMeme = availableMemes[randomIndex];
    
    // Find all responses for the selectedMeme
    const matchingResponses = responses.filter((response) => String(response.meme_id) === String(selectedMeme.id));
    
    // Randomly choose one response from the matchingResponses for topMeme
    const randomResponseTop = matchingResponses.length > 0
        ? matchingResponses[Math.floor(Math.random() * matchingResponses.length)].response
        : null;
    
    // Randomly choose a different response for bottomMeme
    const remainingResponses = matchingResponses.filter((response) => response.response !== randomResponseTop);
    const randomResponseBottom = remainingResponses.length > 0
        ? remainingResponses[Math.floor(Math.random() * remainingResponses.length)].response
        : null;
    
    // Set topMeme and bottomMeme with the selected meme details and responses
    const newTopMeme = {
        meme_id: selectedMeme.id,
        img_url: selectedMeme.img_url,
        response: randomResponseTop,
    };
    
    const newBottomMeme = {
        meme_id: selectedMeme.id,
        img_url: selectedMeme.img_url,
        response: randomResponseBottom,
    };

    console.log("New Top Meme")
    console.log(newTopMeme)
    console.log("New Bottom Meme")
    console.log(newBottomMeme)

    
    setTopMeme(newTopMeme);
    setBottomMeme(newBottomMeme);




    return (
        <div>
            <Header />
            <img
                src={topMeme.img_url}
                onClick={() => Battle("top")}
                width="100%"
                alt="Meme"
            />
            <p>{topCaption}</p>

            <img
                src={bottomMeme.img_url}
                onClick={() => Battle("bottom")}
                width="100%"
                alt="Meme"
            />
            <p>{bottomCaption}</p>
        </div>
    );
}

export default Battle_Memes;
