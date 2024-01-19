import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";


function Caption_Meme() {
    const [caption, setCaption] = useState("");
    const [featuredMeme, setFeaturedMeme] = useState({});
    const [memes, setMemes] = useState([]);

    useEffect(() => {
        // Fetch the list of memes when the component mounts
        fetch("http://localhost:3000/memes")
            .then(response => response.json())
            .then(data => {
                // Assuming the data is an array of memes
                setMemes(data.memes);
                setFeaturedMeme(data.memes[0]); // Set the initial featured meme
            })
            .catch(error => {
                console.error("Error fetching memes:", error);
            });
    }, []); // Empty dependency array makes this effect runs only once when the component mounts

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };


    const showNextMeme = () => {
        // Find the index of the current featuredMeme
        const currentIndex = memes.findIndex((meme) => meme.id === featuredMeme.id);

        // Increment the index to get the next meme (assuming a circular rotation)
        const nextIndex = (currentIndex + 1) % memes.length;

        // Update the featuredMeme state with the next meme
        setFeaturedMeme(memes[nextIndex]);
    };

    const handleCaptionSubmit = () => {


    const newDescription = {
        //! bad way to generate unique id - how should we do this? Maddie to look back at restaurant list app
        id: featuredMeme.descriptions.length + 1, // Generate a unique id
        text: caption,
        likes: 0,
    };

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
                <img src={featuredMeme.img_url} width="100%" alt="Meme" />
            </div>
            <input
                type = "text"
                placeholder="Enter caption..."
                value={caption}
                onChange={handleCaptionChange}
            />
            {/* after we submit the caption, it should automatically show another meme to caption */}
            <button onClick = {handleCaptionSubmit}>Submit</button>
            {/* create some function to show the next meme without a caption */}
            <button>See Next Meme</button>
        </main>
    )

}

export default Caption_Meme;
