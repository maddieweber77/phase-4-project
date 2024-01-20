import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";
import Random


function Battle_Memes() {
    //featured meme - these should originally just be set to a random meme in our database
    const [featuredMeme1, setFeaturedMeme1] = useState({});
    const [featuredMeme2, setFeaturedMeme2] = useState({});

    //featured captions -- these should initially be set to random captions (within a given meme)
    const [featuredCap1, setFeaturedCap1] = useState({});
    const [featuredCap2, setFeaturedCap2] = useState({});

    useEffect(() => {
        // Fetch the list of memes when the component mounts
        fetch("http://localhost:3000/memes")
            .then(response => response.json())
            .then(data => {
                
            })
            .catch(error => {
                console.error("Error fetching memes:", error);
            });
    }, []); // Empty dependency array makes this effect runs only once when the component mounts

    //get total length of memes array
    const totalMemes = jsonData.memes.length;

    //! below should show the next two memes. We need to make sure that it's the same meme image but different captions
    const showNextMeme = () => {
        // Find the index of the current featuredMeme
        // Generate a random number between 0 and totalMemes - 1
        const currentIndex = Math.floor(Math.random() * totalMemes);

        // Increment the index to get the next meme (assuming a circular rotation)
        const nextIndex = (currentIndex + 1) % memes.length;

        // Update the featuredMeme state with the next meme
        setFeaturedMeme1(memes[nextIndex]);
        setFeaturedMeme2(memes[nextIndex]);

        // we also need to find a way to compare one caption for a given meme against another caption for a given meme. Let's do two random numbers (within the length of the mem descriptions' length). If there is only one caption for a given meme, let's have a button that says 
    };

    //! below should update the number of likes for a given meme / description (should be fetch request)
    const handleCaptionSubmit = () => {
    

        //! how was featuredDuck linked in the duck lab? that is how we should update featured meme
        fetch(`http://localhost:3000/memes/${featuredMeme.descriptions}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //! need to append the new description 
            body: JSON.stringify({
                description: newDescription,
            }),
            })

            .then(response => response.json())
            .then(data => {
                // Handle the response from the backend if needed
                console.log("Description added:", data);
            })
            .catch(error => {
                console.error("Error adding description:", error);
            });
        
        showNextMeme();
    
        // Reset the caption state
        setCaption("");
    };

    return(
        <main>
            <Header/>
            <div>
                {/* how do I show the caption below? */}
                {/* want add some CSS so that when u hover over a meme, there's a bright bold outline */}
                <img src={featuredMeme1.img_url} onClick = {handleCaptionSubmit} width="100%" alt="Meme" />
                <img src={featuredMeme2.img_url} onClick = {handleCaptionSubmit} width="100%" alt="Meme" />
            </div>
            
            {/* after we click on which meme we prefer, it should automatically show another two memes w captions to vote on */}
            <button >Submit</button>
            {/* create some function to show the next meme without a caption */}
            <button>See Next Meme</button>
        </main>
    )

}

export default Caption_Meme;
