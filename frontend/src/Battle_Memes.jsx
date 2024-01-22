import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Random;


// Placeholder import for Random, update it accordingly
import Random from "random";

function Battle_Memes() {
    // featured meme - these should originally just be set to a random meme in our database
    const [featuredMeme1, setFeaturedMeme1] = useState({});
    const [featuredMeme2, setFeaturedMeme2] = useState({});

    // featured captions -- these should initially be set to random captions (within a given meme)
    const [featuredCap1, setFeaturedCap1] = useState({});
    const [featuredCap2, setFeaturedCap2] = useState({});

    const [newDescription, setNewDescription] = useState(""); // Define newDescription state
    const [caption, setCaption] = useState(""); // Define caption state

    useEffect(() => {
        // Fetch the list of memes when the component mounts
        fetch("http://localhost:3000/memes")
            .then(response => response.json())
            .then(data => {
                const totalMemes = data.memes.length;
                setFeaturedMeme1(data.memes[0]); // Set initial featured memes
                setFeaturedMeme2(data.memes[1]);
            })
            .catch(error => {
                console.error("Error fetching memes:", error);
            });
    }, []); // Empty dependency array makes this effect run only once when the component mounts

    const showNextMeme = () => {
        const currentIndex = Math.floor(Math.random() * totalMemes);
        const nextIndex = (currentIndex + 1) % totalMemes;
        setFeaturedMeme1(data.memes[nextIndex]);
        setFeaturedMeme2(data.memes[nextIndex]);
    };

    const handleCaptionSubmit = () => {
        fetch(`http://localhost:3000/memes/${featuredMeme1.descriptions}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                description: newDescription,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log("Description added:", data);
        })
        .catch(error => {
            console.error("Error adding description:", error);
        });

        showNextMeme();
        setCaption("");
    };

    return (
        <main>
            <Header />
            <div>
                <img src={featuredMeme1.img_url} onClick={handleCaptionSubmit} width="100%" alt="Meme" />
                <img src={featuredMeme2.img_url} onClick={handleCaptionSubmit} width="100%" alt="Meme" />
            </div>

            <button>Submit</button>
            <button onClick={showNextMeme}>See Next Meme</button>
        </main>
    );
}

export default Battle_Memes;
