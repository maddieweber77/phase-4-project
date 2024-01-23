import React from "react";
import { NavLink } from "react-router-dom";



function CaptionCard ({ img, alt }) {


    return (
        <div className="caption-card">
            {/* Need to update route so meme chosen populates the Caption Meme page */}
            <NavLink to='/Caption-Meme'>
                <img className='uncaptioned-meme-image' src={img} alt={alt}></img>
            </NavLink>
        </div>
        

    )
}

export default CaptionCard;