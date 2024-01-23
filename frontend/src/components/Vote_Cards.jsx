import React from "react";
import { Link } from 'react-router-dom';
import "/Users/maddieweber/Development/code/phase-4/phase-4-project/frontend/src/App.css"

function Vote_Cards() {
    const fakeData = {
      
        "memesToBeVotedOn": [
          {
            "img_url": "https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
            "caption": "MWAHAHA",
            "creator_id": 3,
            "score": 7,
            "response": "Random String"
          },
          {
            "img_url": "https://i.pinimg.com/236x/06/d2/68/06d2688635941034272ed460d1269c2b.jpg",
            "caption": "WELP",
            "creator_id": 1,
            "score": -2,
            "response": "Random String2"
          },
          {
            "img_url": "https://miro.medium.com/v2/resize:fit:908/1*vSA5V7skyN-xJAfMLGJqTA.jpeg",
            "caption": "EW!",
            "creator_id": 2,
            "score": 54,
            "response": "Random String 3"
          },
          {
            "img_url": "https://static01.nyt.com/images/2021/04/30/multimedia/30xp-meme/29xp-meme-articleLarge-v3.jpg?quality=75&auto=webp&disable=upscale",
            "caption": "MWAHAHA",
            "creator_id": 3,
            "score": 3,
            "response": "Random String 4"
          },
          {
            "img_url": "https://i.pinimg.com/236x/06/d2/68/06d2688635941034272ed460d1269c2b.jpg",
            "caption": "WELP",
            "creator_id": 1,
            "score": -6,
            "response": "Random String 5"
          },
          {
            "img_url": "https://miro.medium.com/v2/resize:fit:908/1*vSA5V7skyN-xJAfMLGJqTA.jpeg",
            "caption": "EW!",
            "creator_id": 2,
            "score": 46,
            "response": "Random String 6"
          }
        ]
      };

      

      return (
        <div className="vote-cards-container">
          <Link to="/Battle-Memes">
            <button>Vote on the Funniest Captions!</button>
          </Link>
    
          <div className="cards-wrapper">
            {fakeData.memesToBeVotedOn.slice(0, 5).map((meme, index) => (
              <div key={index} className="container-card">
                <img
                  src={meme.img_url}
                  alt={`Meme ${index + 1}`}
                  className="meme-image"
                />
                <div className="response-overlay">{meme.response}</div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    export default Vote_Cards;