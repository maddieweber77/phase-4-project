import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
// import Random from "random";

function Battle_Memes() {
    
    //! States defined here
    // featured meme - these should originally just be set to a random meme in our database
    const [featuredMeme1, setFeaturedMeme1] = useState({});
    const [featuredMeme2, setFeaturedMeme2] = useState({});
    // featured captions -- these should initially be set to random captions (within a given meme)
    const [featuredCap1, setFeaturedCap1] = useState({});
    const [featuredCap2, setFeaturedCap2] = useState({});
    const [newDescription, setNewDescription] = useState(""); // Define newDescription state
    const [caption, setCaption] = useState(""); // Define caption state
    const [totalMemes, setTotalMemes] = useState(0); // Use state to track # of totalMemes
    const [memes, setMemes] = useState([]); // Added state for storing meme data
    const [description1, setDescription1] = useState(""); // New state for description
    const [description2, setDescription2] = useState(""); // New state for description

    useEffect(() => {
        // Fetch the list of memes when the component mounts
        fetch("http://localhost:3000/memes")
            .then(response => response.json())
            .then(data => {
                setMemes(data);
                setTotalMemes(data.length);
                //! need to do a random number
                setFeaturedMeme1(data[0]); // Set initial featured memes
                setFeaturedMeme2(data[0]);
                setFeaturedCap1(data[0]); // Assuming there is at least one response
                setFeaturedCap2(data[0]); // Assuming there are at least two responses
                setDescription1("");
                setDescription2("");
            })
            .catch(error => {
                console.error("Error fetching memes:", error);
            });
    }, []); 

    const showNextMeme = () => {
        //! we need to make sure that it's a different # from last time
        const currentIndex = Math.floor(Math.random() * totalMemes);
        const nextIndex = (currentIndex + 1) % totalMemes;
        setFeaturedMeme1(memes[nextIndex]);
        setFeaturedMeme2(memes[nextIndex]);

        // Set responses for the next memes
        setFeaturedCap1(memes[nextIndex]); // Assuming there is at least one response
        setFeaturedCap2(memes[nextIndex]); // Assuming there are at least two responses

        setDescription1("");
        setDescription2("");
    };

    return (
        <main>
            <Header />
            <div>
                <img src={featuredMeme1.img_url} onClick={showNextMeme} width="100%" alt="Meme" />
                <p>{featuredCap1.caption}</p>

                <img src={featuredMeme2.img_url} onClick={showNextMeme} width="100%" alt="Meme" />
                <p>{featuredCap2.caption}</p>
            </div>

            <button>Submit</button>
            <button onClick={showNextMeme}>See Next Meme</button>
        </main>
    );
}

export default Battle_Memes;
