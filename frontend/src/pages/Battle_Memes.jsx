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
    const [responses, setResponses] = useState([]);

    let prevMemeId = null;
    let currentIndex = null;

    useEffect(() => {
        // Fetch the list of responses and memes when the component mounts
        Promise.all([
          fetch("http://localhost:3000/responses").then((response) =>
            response.json()
          ),
          fetch("http://localhost:3000/memes").then((response) => response.json()),
        ])
          .then(([responsesData, memesData]) => {
            setResponses(responsesData);
            setMemes(memesData);
            setTotalMemes(memesData.length);
    
            const randomIndex = Math.floor(Math.random() * memesData.length);
            const initialMeme = memesData[randomIndex];
    
            setFeaturedMeme1(initialMeme);
            setFeaturedMeme2(initialMeme);
    
            const initialResponse = getResponseByMemeId(initialMeme.id, responsesData);
            console.log(initialResponse)
            setFeaturedCap1(initialResponse);
            setFeaturedCap2(initialResponse);

            setDataLoaded(true);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }, []); 

      const showNextMeme = () => {
        // // Ensure that it's a different number from last time
        // let currentIndex = Math.floor(Math.random() * totalMemes);
        // Shuffle the array of indices
        const shuffledIndices = [...Array(totalMemes).keys()].sort(() => Math.random() - 0.5);

        // Find the next index that is different from the current and previous meme
        let nextIndex = shuffledIndices.find(index => index !== currentIndex && memes[index].id !== prevMemeId);

        // If all memes have been shown, shuffle again
        if (nextIndex === undefined) {
            // Shuffle the array of indices again
            const shuffledAgain = [...Array(totalMemes).keys()].sort(() => Math.random() - 0.5);

            // Find the next index that is different from the current and previous meme
            nextIndex = shuffledAgain.find(index => index !== currentIndex && memes[index].id !== prevMemeId);
        }

        // Update the current index and previous meme ID
        currentIndex = nextIndex;
        prevMemeId = featuredMeme1.id;

        // Update featured memes
        setFeaturedMeme1(memes[nextIndex]);

        // Set a random response for the next meme
        setFeaturedCap1(getResponseByMemeId(memes[nextIndex].id, responses));

        // Set the second featured meme to the same image as the first one
        setFeaturedMeme2(featuredMeme1);

        // Set a random response for the second featured meme
        setFeaturedCap2(getResponseByMemeId(memes[nextIndex].id, responses));
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
        const responsesForMeme = responsesData.filter(response => response.meme_id === memeId);
        
        console.log("Printing from getResponseByMemeId:");
        console.log(responsesForMeme);
    
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
