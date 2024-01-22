import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Header from "../components/Header";
import Battle_Memes from "./Battle_Memes";
import Caption_Meme from "./Caption_Meme";

function Home() {
    const [activeComponent, setActiveComponent] = useState(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case "Submit Meme":
                return <SubmitMemeComponent />;
            case "Caption Meme":
                return <CaptionMemeComponent />;
            case "Battle Memes":
                return <BattleMemesComponent />;
            case "Leaderboard":
                return <LeaderboardComponent />;
            default:
                return null;
        }
    };

    const SubmitMemeComponent = () => (
        // Define the component for "Submit Meme"
        <div>
            {/* Your Submit Meme component content goes here */}
        </div>
    );

    const CaptionMemeComponent = () => (
        // Render the Caption_Meme component when "Caption Meme" button is clicked
        <Caption_Meme />
    );

    const BattleMemesComponent = () => (
        // Define the component for "Battle Memes"
        <Battle_Memes />
    );

    const LeaderboardComponent = () => (
        // Define the component for "Leaderboard"
        <div>
            {/* Your Leaderboard component content goes here */}
        </div>
    );

    return (
        <main>
            <Header />
            <button onClick={() => setActiveComponent("Submit Meme")}>Submit Meme</button>
            <button onClick={() => setActiveComponent("Caption Meme")}>Caption Meme</button>
            <button onClick={() => setActiveComponent("Battle Memes")}>Battle Memes</button>
            <button onClick={() => setActiveComponent("Leaderboard")}>Leaderboard</button>


            {/* Render the active component based on the state */}
            {renderComponent()}
        </main>
    );
}

export default Home;
