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

    useEffect(() => {
        // Initialize top and bottom memes on component mount
        showNextMeme();
    }, []);

    const getRandomMemePair = (attempts = 0) => {
        const availableMemes = memes.filter((meme) => {
            // Filter out memes that are already voted
            return !votedMemes.some((item) => item.meme_id === meme.id);
        });
    
        if (availableMemes.length < 2) {
            // Not enough available memes, reset votedMemes
            setVotedMemes([]);
        }
    
        // Get a random meme
        const randomIndex = Math.floor(Math.random() * availableMemes.length);
        const selectedMeme = availableMemes[randomIndex];
    
        // Find another meme with the same img_url but different contestant_id
        const matchingMeme = availableMemes.find(
            (meme) => meme.img_url === selectedMeme.img_url && meme.id !== selectedMeme.id
        );
    
        if (matchingMeme) {
            // If a matching meme is found, return the pair
            return [selectedMeme, matchingMeme];
        } else if (attempts < 10) {
            // If no matching meme is found and attempts are less than 10, try again
            return getRandomMemePair(attempts + 1);
        } else {
            // If attempts exceed 10, return an empty array or handle it accordingly
            return [];
        }
    };

    const showNextMeme = () => {
        const [newTopMeme, newBottomMeme] = getRandomMemePair();
        setTopMeme(newTopMeme);
        setBottomMeme(newBottomMeme);
        setTopCap("");
        setBottomCap("");
    };

    const Battle = (clickedMemePosition) => {
        const clickedMeme = clickedMemePosition === "top" ? topMeme : bottomMeme;
        const opponentMeme = clickedMemePosition === "top" ? bottomMeme : topMeme;

        // Check if the meme/response combination is not already voted
        if (!votedMemes.some((item) => item.meme_id === clickedMeme.id)) {
            // Update score based on clickedMemePosition
            const updatedResponses = responses.map((response) => {
                if (
                    response.meme_id === clickedMeme.id &&
                    response.contestant_id === clickedMeme.creator_id
                ) {
                    response.score += 1;
                } else if (
                    response.meme_id === opponentMeme.id &&
                    response.contestant_id === opponentMeme.creator_id
                ) {
                    response.score -= 1;
                }
                return response;
            });

            // Append the unclicked meme/response combination to votedMemes
            setVotedMemes([...votedMemes, opponentMeme]);

            // Update responses in state
            // You may need to update this based on how your responses are stored
            // e.g., setResponses(updatedResponses);
        }

        // Show the next memes
        showNextMeme();
    };

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

            <button>Submit</button>
            <button onClick={showNextMeme}>See Next Meme</button>
        </div>
    );
}

export default Battle_Memes;
