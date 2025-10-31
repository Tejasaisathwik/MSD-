import React from 'react';

const StatsSection = ({ highScore, gamesPlayed }) => {
    return (
        <div className="stats-section">
            <div className="stat-item">
                <i className="fas fa-trophy"></i>
                <span>High Score: <span id="high-score">{highScore}</span></span>
            </div>
            <div className="stat-item">
                <i className="fas fa-gamepad"></i>
                <span>Games Played: <span id="games-played">{gamesPlayed}</span></span>
            </div>
        </div>
    );
};

export default StatsSection;