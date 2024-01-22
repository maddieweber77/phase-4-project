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
        //! we need to make sure that it's a different # from last time
        const currentIndex = Math.floor(Math.random() * totalMemes);
        const nextIndex = (currentIndex + 1) % totalMemes;
        setFeaturedMeme1(memes[nextIndex]);
        setFeaturedMeme2(memes[nextIndex]);

        // Set responses for the next memes
        setFeaturedCap1(getResponseByMemeId(memes[nextIndex].id));
        setFeaturedCap2(getResponseByMemeId(memes[nextIndex].id));

    };

    const getResponseByMemeId = (memeId, responsesData) => {
        const responsesForMeme = responsesData.filter(response => response.meme_id === memeId);
        console.log(responsesForMeme)
        console.log("printing from getResponseByMemeId:")
        console.log(responsesForMeme)
        return responsesForMeme[0]?.response || "";
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
