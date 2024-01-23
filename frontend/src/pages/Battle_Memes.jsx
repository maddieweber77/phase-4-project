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
    const [featuredCap1, setFeaturedCap1] = useState("");
    const [featuredCap2, setFeaturedCap2] = useState("");
    const [dataLoaded, setDataLoaded] = useState(true);
    const [caption, setCaption] = useState(""); // Define caption state
    const [totalMemes, setTotalMemes] = useState(0); // Use state to track # of totalMemes
    const [memes, setMemes] = useState([]); // Added state for storing meme data
    const [users, setUsers] = useState([]) // Added state for storing user data
    const [responses, setResponses] = useState([]);

    let prevMemeId = null;
    let currentIndex = null;

    useEffect(() => {
        //! need to fetch all the users also
        // Fetch the list of responses and memes when the component mounts
        Promise.all([
          fetch("http://localhost:3000/responses").then((response) =>
            response.json()
          ),
          fetch("http://localhost:3000/memes").then((response) => response.json()),
          fetch("http://localhost:3000/users").then((response) => response.json()),
        ])
          .then(([responsesData, memesData, usersData]) => {
            setResponses(responsesData);
            setMemes(memesData);
            setUsers(usersData)
            setTotalMemes(memesData.length);
    
            const randomIndex = Math.floor(Math.random() * memesData.length);
            const initialMeme = memesData[randomIndex];
    
            //! below is why the starting two memes are the same
            setFeaturedMeme1(initialMeme);
            setFeaturedMeme2(initialMeme);
    
            const initialResponse = getResponseByMemeId(initialMeme.id, responsesData);
            setFeaturedCap1(initialResponse);
            setFeaturedCap2(initialResponse);

            setDataLoaded(true);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []); 

      //! we need to pull in the data from the memes state 
      const showNextMeme = (clickedMemePosition) => {
        // Get two random responses
        const randomResponses = getRandomResponses(responses);
    
        // Extract meme IDs and image URLs from the responses
        const memeId1 = randomResponses[0]?.meme_id || '';
        const memeId2 = randomResponses[1]?.meme_id || '';
        const imgUrl1 = getMemeImgUrl(memeId1);
        const imgUrl2 = getMemeImgUrl(memeId2);
    
        // Update featured memes and captions
        setFeaturedMeme1({ id: memeId1, img_url: imgUrl1 });
        setFeaturedCap1(randomResponses[0]?.response || '');
    
        setFeaturedMeme2({ id: memeId2, img_url: imgUrl2 });
        setFeaturedCap2(randomResponses[1]?.response || '');
    
        // Call updateScore with the meme IDs and clicked meme position
        updateScore(memeId1, memeId2, clickedMemePosition);
    };
    
    
    const getRandomResponses = (responsesData) => {
        // Shuffle the responses and return the first two
        const shuffledResponses = responsesData.sort(() => Math.random() - 0.5);
        return shuffledResponses.slice(0, 2);
    };
    
    const getMemeImgUrl = (memeId) => {
        console.log("memes state inside getMemeImgURL", memes)
        const meme = memes.find((m) => String(m.id) === String(memeId));
        //! undefined
        console.log("meme img inside getMemeImgURL", meme)
        return meme?.img_url || ''; // Return the image URL or an empty string if not found
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
    

    useEffect(() => {
        // Use useEffect to handle side effects (e.g., fetching responses) after rendering
        if (featuredMeme1.id) {
            setFeaturedCap1(getResponseByMemeId(featuredMeme1.id, responses));
        }
        if (featuredMeme2.id) {
            setFeaturedCap2(getResponseByMemeId(featuredMeme2.id, responses));
        }
    }, [featuredMeme1.id, featuredMeme2.id, responses]);

    
    const getResponseByMemeId = (memeId, responsesData) => {
    
        // Convert memeId to a number for strict equality
        const memeIdNumber = Number(memeId);
    
        const responsesForMeme = responsesData.filter(response => response.meme_id === memeIdNumber);
    
        // Generate a random index within the length of the subarray
        const randomIndex = Math.floor(Math.random() * responsesForMeme.length);
    
        return responsesForMeme[randomIndex]?.response || "";
    };

    return (
        <main>
          <Header />
          <div>
          <img
            src={featuredMeme1.img_url}
            onClick={() => showNextMeme("top")} // Corrected
            width="100%"
            alt="Meme"
            />
            <p>{featuredCap1}</p>
    
            <img
                src={featuredMeme2.img_url}
                onClick={() => showNextMeme("bottom")} // Corrected
                width="100%"
                alt="Meme"
                />
            <p>{featuredCap2}</p>
          </div>
    
          <button>Submit</button>
          <button onClick={showNextMeme}>See Next Meme</button>
        </main>
      );
}

export default Battle_Memes;
