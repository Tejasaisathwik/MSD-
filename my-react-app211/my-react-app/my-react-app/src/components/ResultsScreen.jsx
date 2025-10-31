import React from 'react';

const ResultsScreen = ({ result, playAgain, goHome, addPlayer }) => {
    if (!result) return null;

    const { score, total, correct, wrong, timeTaken, category } = result;
    const percentage = Math.round((score / (total || 1)) * 100);

    let performanceText = 'Nice work!';
    if (percentage >= 90) performanceText = 'Excellent!';
    else if (percentage >= 70) performanceText = 'Great job!';
    else if (percentage >= 50) performanceText = 'Not bad, keep practicing!';
    else performanceText = 'Keep trying — you\'ll improve!';

    return (
        <div id="results-screen" className="screen active">
            <div className="results-container">
                <div className="results-header">
                    <i className="fas fa-flag-checkered"></i>
                    <h2>Quiz Complete!</h2>
                    <p style={{ color: '#666', marginTop: 8 }}>{category}</p>
                </div>

                <div className="score-summary">
                    <div className="final-score">
                        <span id="final-score">{score}</span>
                        <small> out of <span id="total-questions">{total}</span></small>
                    </div>

                    <div className="percentage">
                        <span id="percentage">{percentage}%</span>
                    </div>
                </div>

                <div className="performance-message">
                    <p id="performance-text">{performanceText}</p>
                </div>

                <div className="results-stats">
                    <div className="stat">
                        <i className="fas fa-check-circle"></i>
                        <span>Correct: <span id="correct-answers">{correct}</span></span>
                    </div>
                    <div className="stat">
                        <i className="fas fa-times-circle"></i>
                        <span>Wrong: <span id="wrong-answers">{wrong}</span></span>
                    </div>
                    <div className="stat">
                        <i className="fas fa-clock"></i>
                        <span>Time: <span id="time-taken">{timeTaken}s</span></span>
                    </div>
                </div>

                {result.autoSaved && (
                    <div style={{ marginBottom: '20px', color: '#4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <i className="fas fa-check-circle"></i>
                        <span>Score automatically saved to dashboard</span>
                    </div>
                )}
                <div className="results-actions">
                    <button id="play-again-btn" className="action-btn primary" onClick={playAgain}>
                        <i className="fas fa-redo"></i> Play Again
                    </button>
                    <button id="home-btn" className="action-btn secondary" onClick={goHome}>
                        <i className="fas fa-home"></i> Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultsScreen;