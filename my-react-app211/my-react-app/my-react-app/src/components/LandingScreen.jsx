import React from 'react';

const LandingScreen = ({ onGetStarted }) => {
    return (
        <div id="landing-screen" className="screen active">
            <div className="landing-hero">
                <h1>
                    <i className="fas fa-brain"></i> Welcome to Multi Quiz Gaming
                </h1>
                <p>
                    Master multiple categories, challenge friends, and track your progress with a beautiful dashboard.
                </p>
                <div className="landing-actions">
                    <button className="action-btn primary" onClick={onGetStarted}>
                        <i className="fas fa-play"></i> Get Started
                    </button>
                    <a href="#features" className="action-btn secondary" style={{ textDecoration: 'none' }}>
                        <i className="fas fa-info-circle"></i> Learn More
                    </a>
                </div>

                <div className="landing-features" id="features">
                    <div className="category-card">
                        <i className="fas fa-layer-group"></i>
                        <h3>Diverse Categories</h3>
                        <p>General, Science, History, Sports, Tech, and Entertainment.</p>
                    </div>
                    <div className="category-card">
                        <i className="fas fa-random"></i>
                        <h3>Fresh Every Time</h3>
                        <p>Large question pools with 10 random questions per quiz.</p>
                    </div>
                    <div className="category-card">
                        <i className="fas fa-tachometer-alt"></i>
                        <h3>Live Progress</h3>
                        <p>Clean progress, timer, and instant answer feedback.</p>
                    </div>
                    <div className="category-card">
                        <i className="fas fa-chart-line"></i>
                        <h3>Player Dashboard</h3>
                        <p>Track high scores, games played, and recent results.</p>
                    </div>
                </div>

                <div className="landing-value-band">
                    <div className="stats-section" style={{ justifyContent: 'center' }}>
                        <div className="stat-item">
                            <i className="fas fa-question"></i>
                            <span>10 questions per quiz</span>
                        </div>
                        <div className="stat-item">
                            <i className="fas fa-users"></i>
                            <span>Single player with rankings</span>
                        </div>
                        <div className="stat-item">
                            <i className="fas fa-shield-alt"></i>
                            <span>Secure local login</span>
                        </div>
                    </div>
                </div>

                <div className="landing-how">
                    <h3><i className="fas fa-route"></i> How it works</h3>
                    <ol style={{ marginLeft: 20, lineHeight: 1.9 }}>
                        <li>Click <strong>Get Started</strong> and login or create a player.</li>
                        <li>Pick a category and answer <strong>10 random questions</strong>.</li>
                        <li>See your score, detailed breakdown, and save results automatically.</li>
                        <li>Open the <strong>Dashboard</strong> to view rankings and progress.</li>
                    </ol>
                </div>

                <div style={{ marginTop: 28 }}>
                    <button className="action-btn primary" onClick={onGetStarted}>
                        Start Your First Quiz <i className="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingScreen;
