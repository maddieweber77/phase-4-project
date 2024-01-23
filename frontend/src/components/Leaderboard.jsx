import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Header from "./Header";

function Leaderboard(completedMemes) {

    // How the total_points from the users being attributed to the memes?

    const [firstPlace, setFirstPlace] = useState('');
    const [secondPlace, setSecondPlace] = useState('');
    const [thirdPlace, setThirdPlace] = useState('');
    const [fourthPlace, setFourthPlace] = useState('');
    const [fifthPlace, setFifthPlace] = useState('');

    
    useEffect(() => {
        if (completedMemes && completedMemes.length > 0){
            const sortedMemes = [...completedMemes].sort((a,b) => b.total_points - a.total_points);
            const [first, second, third, fourth, fifth] = sortedMemes.slice(0,5);

            setFirstPlace(`${first.user.username} - ${first.total_points} points`);
    setSecondPlace(`${second.user.username} - ${second.total_points} points`);
    setThirdPlace(`${third.user.username} - ${third.total_points} points`);
    setFourthPlace(`${fourth.user.username} - ${fourth.total_points} points`);
    setFifthPlace(`${fifth.user.username} - ${fifth.total_points} points`);
        }
    })
    


    return (
        <div className="leaderboard-card">
            <ol className="leaderboard-list">
                <li className='leaderboard-place'>🥇 {firstPlace}</li>
                <li className='leaderboard-place'>🥈 {secondPlace}</li>
                <li className='leaderboard-place'>🥉 {thirdPlace}</li>
                <li className='leaderboard-place'>{fourthPlace}</li>
                <li className='leaderboard-place'>{fifthPlace}</li>
            </ol>

        </div>
        
    )
}

export default Leaderboard