import React from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";


function Caption_Meme() {
    const [caption, setCaption] = useState(""); // State for the caption
    
    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleCaptionSubmit = () => {
        // Add logic to send the caption to the backend and update the meme's descriptions
        // You may use a state management library or make a fetch request to update the backend
        console.log("Caption submitted:", caption);
    };

    return(
        <main>
            <Header/>
            <div>
                <img src={memes.img_url} width="100%" alt="Meme" />
            </div>
            <input
                type = "text"
                placeholder="Enter caption..."
                value={caption}
                onChange={handleCaptionChange}
            />
            <button onClick = {handleCaptionSubmit}>Submit</button>
            <button>See Next Meme</button>
        </main>
    )

}

export default Caption_Meme;
