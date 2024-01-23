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

      const showNextMeme = () => {
        const shuffledIndices = [...Array(totalMemes).keys()].sort(() => Math.random() - 0.5);
        let nextIndex = shuffledIndices.find(index => index !== currentIndex && memes[index].id !== prevMemeId);

        if (nextIndex === undefined) {
            const shuffledAgain = [...Array(totalMemes).keys()].sort(() => Math.random() - 0.5);
            nextIndex = shuffledAgain.find(index => index !== currentIndex && memes[index].id !== prevMemeId);
        }

        currentIndex = nextIndex;
        prevMemeId = featuredMeme1.id;

        // Update featured memes
        setFeaturedMeme1(memes[nextIndex]);

        // Set a random response for the next meme
        const nextMemeId = memes[nextIndex].id;
        const response1 = getResponseByMemeId(nextMemeId, responses);
        setFeaturedCap1(response1);

        // Set the second featured meme to the same image as the first one
        setFeaturedMeme2(featuredMeme1);

        // Set a random response for the second featured meme
        const response2 = getResponseByMemeId(nextMemeId, responses);
        setFeaturedCap2(response2);

        // Add a point to the score when a meme is clicked
        updateScore(prevMemeId);
    };

   
    const updateScore = async (memeId) => {
        // Find the response associated with the clicked meme
        console.log("memeid", memeId)
        const responseForMeme = responses.find(response => String(response.meme_id) === String(memeId));
        console.log("response for meme", responseForMeme)

    
        if (responseForMeme) {
            try {
                const updatedResponses = responses.map(response =>
                    response.id === responseForMeme.id
                        ? { ...response, score: response.score + 1 }
                        : response
                );
                setResponses(updatedResponses);
    
                // PATCH request to update the score on the server
                const patchResponse = await fetch(`http://localhost:3000/responses/${responseForMeme.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        score: responseForMeme.score + 1,
                    }),
                });
    
                if (!patchResponse.ok) {
                    // Handle error, maybe revert local state changes
                    console.error('Failed to update score on the server');
                }
            } catch (error) {
                console.error('Error updating score:', error);
            }
            
            //! need to finish the below
            //incrementing the score for the user
            const updatedUsers = users.map(user =>
                user.id === responseForMeme.contestant_id
                    ? { ...user, total_points: user.total_points + 1 }
                    : user
            );
            setUsers(updatedUsers);
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
              onClick={showNextMeme}
              width="100%"
              alt="Meme"
            />
            <p>{featuredCap1}</p>
    
            <img
              src={featuredMeme2.img_url}
              onClick={showNextMeme}
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
