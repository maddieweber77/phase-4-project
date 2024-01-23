import React from "react";
import CaptionCard from "./Caption_Card";

function Caption_Cards_List({ memesToBeCaptioned }) {

    // map through memesToBeCaptioned and create a card for each caption
    const uncaptionedMemes = memesToBeCaptioned.map(meme => 
        <CaptionCard 
            key={meme.id} 
            img={meme.img_url}
            alt={meme.name} 
            />
    )
    


    return (
        <div className="caption-card-bin">
            {uncaptionedMemes}
        </div>
    )

}

export default Caption_Cards_List;