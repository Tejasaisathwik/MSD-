import React from 'react';

const categories = [
    { key: 'general', icon: 'fas fa-globe', title: 'General Knowledge', desc: 'Test your overall knowledge' },
    { key: 'science', icon: 'fas fa-flask', title: 'Science', desc: 'Explore scientific facts' },
    { key: 'history', icon: 'fas fa-landmark', title: 'History', desc: 'Journey through time' },
    { key: 'sports', icon: 'fas fa-futbol', title: 'Sports', desc: 'Athletic knowledge test' },
    { key: 'technology', icon: 'fas fa-laptop-code', title: 'Technology', desc: 'Digital world insights' },
    { key: 'entertainment', icon: 'fas fa-film', title: 'Entertainment', desc: 'Movies, music & more' }
];

const HomeScreen = ({ startQuiz, highScore = 0, gamesPlayed = 0, openDashboard }) => {
    return (
        <div id="home-screen" className="screen active">
            <div style={{ textAlign: 'center', marginBottom: 24, color: 'white' }}>
                <p>Choose a category below to get started</p>
            </div>

            <div className="category-grid">
                {categories.map(cat => (
                    <div
                        key={cat.key}
                        className="category-card"
                        data-category={cat.key}
                        onClick={() => startQuiz(cat.key)}
                    >
                        <i className={cat.icon}></i>
                        <h3>{cat.title}</h3>
                        <p>{cat.desc}</p>
                    </div>
                ))}
            </div>

            <div className="stats-section" aria-live="polite">
                <div className="stat-item" title="Highest score">
                    <i className="fas fa-trophy"></i>
                    <span>High Score: <strong id="high-score">{highScore}</strong></span>
                </div>
                <div className="stat-item" title="Games played">
                    <i className="fas fa-gamepad"></i>
                    <span>Games Played: <strong id="games-played">{gamesPlayed}</strong></span>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <button className="action-btn secondary" onClick={() => openDashboard && openDashboard()}>
                        <i className="fas fa-table"></i> Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeScreen;