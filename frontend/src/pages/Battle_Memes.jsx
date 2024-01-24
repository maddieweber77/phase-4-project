import React, { useState, useEffect } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import Header from "../components/Header";
// import Random from "random";

function Battle_Memes() {
    const [responses, memes, users] = useLoaderData()
    //! States defined here
    // featured meme - these should originally just be set to a random meme in our database
    const [featuredMeme1, setFeaturedMeme1] = useState({});
    const [featuredMeme2, setFeaturedMeme2] = useState({});
    // featured captions -- these should initially be set to random captions (within a given meme)
    const [featuredCap1, setFeaturedCap1] = useState("");
    const [featuredCap2, setFeaturedCap2] = useState("");
    const [dataLoaded, setDataLoaded] = useState(true);
    const [caption, setCaption] = useState(""); // Define caption state
    const [totalMemes, setTotalMemes] = useState(0); // Use state to track # of totalMemes
    const [memesState, setMemes] = useState([]); // Added state for storing meme data
    const [usersState, setUsers] = useState([]) // Added state for storing user data
    const [responseState, setResponses] = useState([]);

    let prevMemeId = null;
    let currentIndex = null;


      //! we need to pull in the data from the memes state 
      const showNextMeme = (clickedMemePosition) => {
        // Get two random responses
        const randomResponses = getRandomResponses(responses);
    
        // Extract meme IDs and image URLs from the responses
        const memeId1 = randomResponses[0]?.meme_id || '';
        const memeId2 = randomResponses[1]?.meme_id || '';
        const imgUrl1 = getMemeImgUrl(memeId1);
        const imgUrl2 = imgUrl1
    
        // Update featured memes and captions
        setFeaturedMeme1({ id: memeId1, img_url: imgUrl1 });
        setFeaturedCap1(randomResponses[0]?.response || "");
    
        setFeaturedMeme2({ id: memeId2, img_url: imgUrl2 });
        const newResponse2 = randomResponses[1]?.response || "";
        
        // Check if newResponse2 is different from setFeaturedCap1
        if (newResponse2 !== featuredCap1) {
            setFeaturedCap2(newResponse2);
        }

        updateScore(memeId1, memeId2, clickedMemePosition);
    };
    
    
    //! we need to make sure that the two responses are different
    const getRandomResponses = (responses) => {
        // Shuffle the responses and return the first two
        const shuffledResponses = responses.sort(() => Math.random() - 0.5);
        return shuffledResponses.slice(0, 2);
    };
    
    const getMemeImgUrl = (memeId) => {
        const meme = memes.find((m) => String(m.id) === String(memeId));
        //! undefined
        return meme?.img_url || ''; // Return the image URL or an empty string if not found
    };

    const getDifferentResponse = (memeId, responses, responseToExclude) => {
        const responsesForMeme = responses.filter(response => response.meme_id === memeId);
        const filteredResponses = responsesForMeme.filter(response => response.response !== responseToExclude);
        const randomIndex = Math.floor(Math.random() * filteredResponses.length);

        return filteredResponses[randomIndex]?.response || "";
    };
    
    const updateScore = async (clickedMemeId, otherMemeId) => {
        // Find the response associated with the clicked meme
        const responseForClickedMeme = responses.find(response => String(response.meme_id) === String(clickedMemeId));
    
        if (responseForClickedMeme) {
            try {
                // Increment the score for the clicked meme both locally and on the server
                const updatedResponses = responses.map(response =>
                    response.id === responseForClickedMeme.id
                        ? { ...response, score: response.score + 1 }
                        : response
                );
                setResponses(updatedResponses);
    
                await fetch(`http://localhost:3000/responses/${responseForClickedMeme.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        score: responseForClickedMeme.score + 1,
                    }),
                });
    
                // Increment the total points for the user of the clicked meme
                const updatedUsers = users.map(user =>
                    user.id === responseForClickedMeme.contestant_id
                        ? { ...user, total_points: user.total_points + 1 }
                        : user
                );
                setUsers(updatedUsers);
    
                // Find the response associated with the other meme (not clicked)
                const responseForOtherMeme = responses.find(response => String(response.meme_id) === String(otherMemeId));
    
                if (responseForOtherMeme) {
                    // Decrement the score for the other meme both locally and on the server
                    const updatedOtherResponses = responses.map(response =>
                        response.id === responseForOtherMeme.id
                            ? { ...response, score: response.score - 1 }
                            : response
                    );
                    setResponses(updatedOtherResponses);
    
                    await fetch(`http://localhost:3000/responses/${responseForOtherMeme.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            score: responseForOtherMeme.score - 1,
                        }),
                    });
                }
            } catch (error) {
                console.error('Error updating score:', error);
            }
        }
    };
    

    
    const getResponseByMemeId = (memeId) => {
        const meme = memes.find(m => m.id === memeId);
        return meme?.responses?.[0]?.response || "";
    };
    

    const renderContent = () => {
        if (!dataLoaded) {
            // Render loading state or other indicator
            return <p>Loading...</p>;
        }

        // Render your actual content here
        return (
            <div>
                <img
                    src={featuredMeme1.img_url}
                    onClick={() => showNextMeme("top")}
                    width="100%"
                    alt="Meme"
                />
                <p>{featuredCap1}</p>

                <img
                    src={featuredMeme2.img_url}
                    onClick={() => showNextMeme("bottom")}
                    width="100%"
                    alt="Meme"
                />
                <p>{featuredCap2}</p>

                <button>Submit</button>
                <button onClick={showNextMeme}>See Next Meme</button>
            </div>
        );
    };

    return (
        <main>
            <Header />
            {renderContent()}
        </main>
    );
}

export default Battle_Memes;
